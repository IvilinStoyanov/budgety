import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../models/interface/category';
import { IUser } from '../models/interface/User';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  viewMode: string = 'exp';
  currentTabIndex: BehaviorSubject<number>;
  isAvailable: BehaviorSubject<any>;
  categoryTemplates: ICategory[] = [];

  constructor(private router: Router) {
    this.currentTabIndex = new BehaviorSubject<number>(0);
    this.isAvailable = new BehaviorSubject<any>(null);
   }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  scrollToTop() {
    window.scroll(0,0);
  }

  isDateToday(date: Date) {
    let today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    let itemDate = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime();

    if (today === itemDate) return true;

    return false;
  }

  saveData(data: any) {
    data.totals.inc = parseFloat(data.totals.inc.toFixed(2));
    data.totals.exp = parseFloat(data.totals.exp.toFixed(2));
    localStorage.setItem('data', JSON.stringify(data));
  }

  calculatePercentageEach(categories: ICategory[], user: IUser) {
    categories.forEach(category => {
      if (category) {
        if (category.exp > 0 && user.inc > 0) category.expPercentage = Math.round((category.exp / user.inc) * 100);
        if (category.inc > 0) category.incPercentage = Math.round((category.inc / user.inc) * 100);
      }
    });

    return categories;
  }

  calculateTotalExpPercentage(user: IUser) {
    const budget = user.inc - user.exp;

    if (user.inc > 0) {
      user.expPercentage = Math.round((user.exp / user.inc) * 100);
      user.incPercentage = 100 - user.expPercentage;

      if (user.expPercentage >= 100) {
        user.expPercentage = 100;
        user.incPercentage = 0;
      }

    }
    else if (budget < 0) {
      user.expPercentage = 100;
      user.incPercentage = 0;
    }
    else {
      user.incPercentage = 0;
      user.expPercentage = 0;
    }

    return user;
  }
}

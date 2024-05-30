import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ICategory } from '../models/interface/category';
import { IUser } from '../models/interface/User';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  viewMode = 'exp';
  currentTabIndex: BehaviorSubject<number>;
  isAvailable: BehaviorSubject<boolean>;
  categoryTemplates: ICategory[] = [];

  constructor(private router: Router) {
    this.currentTabIndex = new BehaviorSubject<number>(0);
    this.isAvailable = new BehaviorSubject<boolean>(null);
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  isDateToday(date: Date): boolean {
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const itemDate = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime();

    if (today === itemDate) return true;

    return false;
  }

  // TOOD: To be removed
  saveData(data: any): void {
    data.totals.inc = parseFloat(data.totals.inc.toFixed(2));
    data.totals.exp = parseFloat(data.totals.exp.toFixed(2));
    localStorage.setItem('data', JSON.stringify(data));
  }

  calculatePercentageEach(categories: ICategory[], user: IUser): ICategory[] {
    categories.forEach(category => {
      if (category) {
        if (category.exp > 0 && user.inc > 0) {
          category.expPercentage = Math.round((category.exp / user.inc) * 100);
        }
        if (category.inc > 0) {
          category.incPercentage = Math.round((category.inc / user.inc) * 100);
        }
      }
    });

    return categories;
  }

  calculateUserBudget(user: IUser): IUser {
    const { inc, exp } = user;

    // Ensure total budget is not zero to avoid division by zero
    const total = inc + exp;

    if (total === 0) {
      return { ...user, incPercentage: 0, expPercentage: 0 };
    }
    const incPercentage = (inc / total) * 100;
    const expPercentage = (exp / total) * 100;

    // Return the updated user object with the percentage properties
    return {
      ...user,
      incPercentage,
      expPercentage
    };
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  viewMode: string;
  currentTabIndex: ReplaySubject<number>;
  isAvailable: BehaviorSubject<any>;

  constructor(private router: Router) {
    this.currentTabIndex = new ReplaySubject<number>(0);
    this.isAvailable = new BehaviorSubject<any>(null);
   }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
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

  calculatePercentageEach(data: any) {
    data.categories.forEach(category => {
      if (category) {
        if (category.exp > 0 && data.totals.inc > 0) category.expPercentage = Math.round((category.exp / data.totals.inc) * 100);
        if (category.inc > 0) category.incPercentage = Math.round((category.inc / data.totals.inc) * 100);
      }
    });

    return data;
  }

  calculateTotalExpPercentage(data: any) {
    if (data.totals.inc > 0) {
      data.expPercentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      data.incPercentage = 100 - data.expPercentage; 

      if (data.expPercentage >= 100) {
        data.expPercentage = 100;
        data.incPercentage = 0;
      } 
        
    }
    else if (data.budget < 0) {
      data.expPercentage = 100;
      data.incPercentage = 0; 
    }
    else {
      data.incPercentage = 0; 
      data.expPercentage = 0;
    }

    return data;
  }
}

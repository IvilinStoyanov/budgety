import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  isDateToday(date: Date) {
    let today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    let itemDate = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime();

    if (today === itemDate) return true;

    return false;
  }
}

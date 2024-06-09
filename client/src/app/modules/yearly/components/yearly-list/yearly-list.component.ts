import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromYearlyActions from '../../state/yearly/yearly.actions';
import { selectYearlyList } from '../../state/yearly/yearly.selectors';
import { AuthService } from '../../../../shared/services/auth.service';
import { selectUser } from '../../../shared/state/user/user.selector';
import { IUser } from '../../../../shared/models/interface/User';
import { AppState } from '../../../shared/state';

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly-list.component.html',
  styleUrls: ['./yearly-list.component.scss']
})
export class YearlyListComponent implements OnInit {
  user$: Observable<IUser>;
  yearlyList$: Observable<{ [key: number]: fromYearlyActions.YearlyItem }>;
  constructor(public authService: AuthService, private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
    this.yearlyList$ = this.store.select(selectYearlyList);
  }

  ngOnInit(): void {
    this.createYearlyList();
  }

  createYearlyList(): void {
    const startYear = new Date().getFullYear();
    const endYear = startYear - 5;

    this.store.dispatch(
      fromYearlyActions.loadYearlyList({ startYear, endYear })
    );
  }

  isYearlyListEmpty(monthlyList: {
    [key: number]: fromYearlyActions.YearlyItem;
  }): boolean {
    return Object.keys(monthlyList).length === 0;
  }
}

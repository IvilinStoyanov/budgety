import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/modules/shared/store/user/user.selector';
import { IUser } from 'src/app/shared/models/interface/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import { MonthlyItem } from '../../models/monthly-item';
import * as monthlyActions from '../../store/monthly-list/monthly.actions';
import { selectMonthlyList } from '../../store/monthly-list/monthly.selectors';

@Component({
  selector: 'app-monthly-list',
  templateUrl: './monthly-list.component.html',
  styleUrls: ['./monthly-list.component.scss']
})
export class MonthlyListComponent implements OnInit {
  user$: Observable<IUser>;
  monthlyList$: Observable<{ [key: number]: MonthlyItem }>;
  dateForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    private transactionsService: TransactionsService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
    this.monthlyList$ = this.store.select(selectMonthlyList);

    this.dateForm = this.fb.group({
      year: new UntypedFormControl(new Date())
    });
  }

  ngOnInit(): void {
    this.store.dispatch(
      monthlyActions.loadMonthlyList({ year: new Date().getFullYear() })
    );
  }

  chosenYearHandler(chosenDate: any, datepicker: MatDatepicker<any>): void {
    datepicker.close();

    this.dateForm.get('year').setValue(chosenDate);

    // TODO: remove this from service and use params in the url
    this.transactionsService.monthlyYearSelected = chosenDate;

    this.store.dispatch(
      monthlyActions.loadMonthlyList({
        year: new Date(chosenDate).getFullYear()
      })
    );
  }

  isMonthlyListEmpty(monthlyList: { [key: number]: MonthlyItem }): boolean {
    return Object.keys(monthlyList).length === 0;
  }
}

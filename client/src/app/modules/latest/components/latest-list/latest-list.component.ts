import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectLatestCategory } from '../../state/latest.selector';
import { AddItemComponent } from '../../../../shared/components/add-item/add-item.component';
import { Category } from '../../../../shared/models/class/category';
import { IUser } from '../../../../shared/models/interface/User';
import { ICategory } from '../../../../shared/models/interface/category';
import { ITransaction } from '../../../../shared/models/interface/transaction';
import { AuthService } from '../../../../shared/services/auth.service';
import { CommonService } from '../../../../shared/services/common.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { selectUser } from '../../../shared/state/user/user.selector';

import * as latestActions from '../../state/latest.actions';

@Component({
  selector: 'app-latest',
  templateUrl: './latest-list.component.html',
  styleUrls: ['./latest-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestListComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  user$: Observable<IUser>;
  viewMode = 'exp';

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router,
    public notification: NotificationService,
    public authService: AuthService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
    this.categories$ = this.store.select(selectLatestCategory);
  }

  ngOnInit(): void {
    this.store.dispatch(latestActions.loadLatest());
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['latest/category'], {
      queryParams: { id: categoryId }
    });
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
    this.commonService.viewMode = mode;

    // if (mode === 'inc') {
    //   this.categories.sort(function (a: { inc: number }, b: { inc: number }) {
    //     return b.inc - a.inc;
    //   });
    // }

    // if (mode === 'exp') {
    //   this.categories.sort(function (a: { exp: number }, b: { exp: number }) {
    //     return b.exp - a.exp;
    //   });
    // }
  }

  showCategories(category: Category): boolean {
    if (category) {
      if (this.viewMode === 'inc') {
        if (category.inc > 0) {
          return true;
        }

        return false;
      }
      if (this.viewMode === 'exp') {
        if (category.exp > 0) {
          return true;
        }

        return false;
      }
    }
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        viewMode: this.viewMode
      }
    });

    dialogRef.afterClosed().subscribe((transaction: ITransaction) => {
      if (transaction) {
        this.store.dispatch(latestActions.createTransaction({ transaction }));
      }
    });
  }
}

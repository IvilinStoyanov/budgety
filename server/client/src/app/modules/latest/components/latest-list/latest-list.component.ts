import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as latestActions from 'src/app/modules/latest/state/latest.actions';
import { selectUser } from 'src/app/modules/shared/state/user/user.selector';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { IUser } from 'src/app/shared/models/interface/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { selectLatestCategory } from '../../state/latest.selector';

@Component({
    selector: 'app-latest',
    templateUrl: './latest-list.component.html',
    styleUrls: ['./latest-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LatestListComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  user$: Observable<IUser>;
  viewMode = 'exp';
  showAddPanel = false;

  constructor(
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

  navigateToCategory(categoryId: string | number): void {
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

  showCategories(category: ICategory): boolean {
    if (!category) {
      return false;
    }

    if (this.viewMode === 'inc') {
      return category.inc > 0;
    }

    if (this.viewMode === 'exp') {
      return category.exp > 0;
    }

    return false;
  }

  openAddItemDialog(): void {
    this.showAddPanel = true;
  }

  closeAddPanel(): void {
    this.showAddPanel = false;
  }

  addTransaction(transaction: ITransaction): void {
    this.showAddPanel = false;
    this.store.dispatch(latestActions.createTransaction({ transaction }));
  }
}


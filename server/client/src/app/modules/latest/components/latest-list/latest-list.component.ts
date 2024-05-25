import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as latestActions from 'src/app/modules/latest/store/latest.actions';
import { AddItemComponent } from 'src/app/shared/components/add-item/add-item.component';
import { Category } from 'src/app/shared/models/class/category';
import { ICategory } from 'src/app/shared/models/interface/category';
import { ITransaction } from 'src/app/shared/models/interface/transaction';
import { IUser } from 'src/app/shared/models/interface/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

import {
  selectLatestCategory,
  selectLatestLoading
} from '../../store/latest.selector';
import { SetupCategoriesComponent } from './modals/setup-categories/setup-categories.component';

@Component({
  selector: 'app-latest',
  templateUrl: './latest-list.component.html',
  styleUrls: ['./latest-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestListComponent implements OnInit {
  categories$: Observable<ICategory[]>;
  user: IUser | undefined;
  viewMode = 'exp';

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router,
    public notification: NotificationService,
    private transactionsService: TransactionsService,
    public authService: AuthService,
    private categoriesService: CategoriesService,
    private cd: ChangeDetectorRef,
    private store: Store
  ) {
    this.categories$ = this.store.select(selectLatestCategory);
  }

  ngOnInit(): void {
    this.store.dispatch(latestActions.loadLatest());

    // this.authService.currentUser$
    //   .pipe(
    //     switchMap(user => {
    //       this.user = this.commonService.calculateTotalExpPercentage(user);

    //       if (!user?.isCategoriesSet) {
    //         this.openSetupCategoriesModal();
    //         return of(null);
    //       } else {
    //         return this.categoriesService.getCategories();
    //       }
    //     }),
    //     map(categories =>
    //       this.commonService.calculatePercentageEach(categories, this.user)
    //     ),
    //     tap(categories => {
    //       this.categories = categories;
    //      // this.categoriesService.categories = this.categories;
    //     }),
    //     take(1)
    //   )
    //   .subscribe(result => {
    //     if (result) {
    //       this.setViewMode('exp');
    //       // set viewMode to inc if there is no expenses on first load.
    //       if (this.user?.exp === 0) {
    //         this.viewMode = 'inc';
    //       }

    //       this.cd.detectChanges();
    //     }
    //   });
  }

  openSetupCategoriesModal(): void {
    const dialogRef = this.dialog.open(SetupCategoriesComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(filteredCategories => {
      if (filteredCategories) {
        this.categoriesService
          .importCategories(filteredCategories)
          .subscribe(result => {
            if (result) {
              // this.categories = result.categories;
              this.user = result.user;

              this.notification.success('Categories successfully imported.');
            }
          });
      }
    });
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
        this.notification.success('Item successfully added');
      }
    });
  }

  // addItem(transaction: ITransaction): void {
  //   this.setViewMode(transaction.type);
  //   this.transactionsService
  //     .createTransactionGlobal(transaction)
  //     .subscribe(result => {
  //       if (result) {
  //         this.user = this.commonService.calculateTotalExpPercentage(
  //           result.user
  //         );

  //         this.authService.setCurrentUser(this.user);
  //         const key = this.categories.findIndex(
  //           category => category._id === result.category._id
  //         );

  //         this.categories[key] = result.category;

  //         this.categories = this.commonService.calculatePercentageEach(
  //           this.categories,
  //           this.user
  //         );

  //         this.cd.detectChanges();
  //       }
  //     });
  // }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

import { SetupCategoriesComponent } from './modals/setup-categories/setup-categories.component';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';

import { ICategory } from 'src/app/models/interface/category';
import { Category } from 'src/app/models/category';
import { IUser } from 'src/app/models/interface/User';

import { map, switchMap, take, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-latest',
  templateUrl: './latest-list.component.html',
  styleUrls: ['./latest-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestListComponent implements OnInit {

  categories: ICategory[] = [];
  user: IUser | undefined;
  viewMode: any;

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router,
    public notification: NotificationService,
    private transactionsService: TransactionsService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.currentUser$.pipe(
      switchMap(user => {
        this.user = this.commonService.calculateTotalExpPercentage(user);

        if (!user?.isCategoriesSet) {
          this.openSetupCategoriesModal();
          return of(null);
        } else {
          return this.categoriesService.getCategories();
        }
      }),
      map(categories => {
        return this.commonService.calculatePercentageEach(categories, this.user);
      }),
      tap(categories => {
        this.categories = categories;
        this.categoriesService.categories = this.categories;
      }),
      take(1),
    ).subscribe(result => {
      if (result) {
        this.setViewMode('exp');
        // set viewMode to inc if there is no expenses on first load.
        if (this.user?.exp === 0) this.viewMode = 'inc';

        this.cd.detectChanges();
      }
    });
  }

  openSetupCategoriesModal() {
    const dialogRef = this.dialog.open(SetupCategoriesComponent, {
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((filteredCategories) => {
      if (filteredCategories) {
        this.categoriesService.importCategories(filteredCategories).subscribe(result => {
          if (result) {
            this.categories = result.categories;
            this.user = result.user;

            this.notification.success("Categories successfully imported.");
          }
        });
      }
    });
  }

  navigateToCategory(categoryId: number) {
    this.router.navigate(['latest/category'], { queryParams: { id: categoryId }, skipLocationChange: true, replaceUrl: false });
  }

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.commonService.viewMode = mode;

    if (mode === 'inc') this.categories.sort(function (a: { inc: number; }, b: { inc: number; }) { return b.inc - a.inc; });

    if (mode === 'exp') this.categories.sort(function (a: { exp: number; }, b: { exp: number; }) { return b.exp - a.exp; });
  }

  showCategories(category: Category) {
    if (category) {
      if (this.viewMode === 'inc') {
        if (category.inc > 0) return true;

        return false;
      }
      if (this.viewMode === 'exp') {
        if (category.exp > 0) return true;

        return false;
      }
    }
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      autoFocus: false,
      data: {
        categories: this.categories,
        viewMode: this.viewMode,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addItem(result);
        this.notification.success("Item successfully added");
      }
    });
  }

  addItem(params: any) {
    this.setViewMode(params.type);
    this.transactionsService.createTransactionGlobal(params).subscribe(result => {
      if (result) {
        this.user = this.commonService.calculateTotalExpPercentage(result.user);

        this.authService.setCurrentUser(this.user);
        const key = this.categories.findIndex(category => category._id === result._categoryId);

        this.categories[key] = result.category;

        this.categories = this.commonService.calculatePercentageEach(this.categories, this.user);

        this.cd.detectChanges();
      }
    });
  }
}

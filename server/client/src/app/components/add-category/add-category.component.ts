import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { MaterialIcons } from 'src/app/enums/material-icons-type';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private _searchIconSubscription: Subscription = new Subscription();

  form: FormGroup;
  searchText: string;

  panelOpenState: boolean;

  currentIconName: string;
  categoryColors: string[];
  currentColorIndex: number;

  icons: any = [];
  foundedIcons: any = [];

  constructor
    (
      private notification: NotificationService,
      private categoriesService: CategoriesService,
      private fb: FormBuilder,
      public router: Router) { }

  ngOnInit() {
    this.icons = Object.values(MaterialIcons).filter(icon => typeof icon !== 'number').map(value => ({ name: value }));
    this.categoryColors = Object.values(CategoriesColors);

    this.createForm();

    const searchIconSubscription$ = this.form
      .get('searchText')
      .valueChanges.subscribe((value) => { this.searchText = value; });

    this._searchIconSubscription.add(searchIconSubscription$);
  }

  ngOnDestroy() {
    this._searchIconSubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required],
      searchText: ['']
    });
  }

  openPanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  selectColor(color: string, index: number) {
    this.currentColorIndex = index;
    this.form.get('color').setValue(color);
  }

  selectIcon(icon) {
    this.currentIconName = icon.name;
    this.form.get('icon').setValue(icon.name);
  }

  addCategory() {
    if (!this.currentIconName || !this.currentColorIndex) {
      this.notification.warn("Please select icon and color");
    }
    if (this.form.valid) {
      const params = this.form.value;

      const category = { color: params.color, icon: params.icon, name: params.name };

      this.categoriesService.importCategory(category)
        .subscribe(() => {
          this.router.navigate(['/latest']);
          this.notification.success('Category successfully added');
        });
    }
  }
}

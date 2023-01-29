import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialIcons } from 'src/app/enums/material-icons-type';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  searchText: string;

  panelOpenState: boolean;

  currentIconName: string;
  categoryColors: string[];
  currentColorIndex: number;
  icons: any = [];
  foundedIcons: any = [];
  icons$: Observable<any>;

  constructor
    (
      private notification: NotificationService,
      private categoriesService: CategoriesService,
      private fb: FormBuilder,
      public router: Router) { }

  ngOnInit() {
    this.icons = Object.values(MaterialIcons)
      .filter(icon => typeof icon !== 'number')
      .map(value => ({ name: value }
      ));

    this.categoryColors = Object.values(CategoriesColors);

    this.createForm();

    this.icons$ = this.form.get('searchText').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(value => value.trim()),
        filter(value => value !== ''),
        switchMap((value => {
          let filteredIcons = [];
          this.icons.map(icon => {

            if (icon.name.includes(value)) filteredIcons.push(icon);
          });
          return of(filteredIcons);
        })
        )
      )
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

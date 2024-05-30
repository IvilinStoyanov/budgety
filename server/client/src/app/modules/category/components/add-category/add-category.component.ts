import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { CategoriesColors } from 'src/app/shared/enums/categories-colors.enum';
import { MaterialIcons } from 'src/app/shared/enums/material-icons-type';
import { Category } from 'src/app/shared/models/class/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { Icon } from '../../models/icon';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form: UntypedFormGroup;
  searchText: string;

  panelOpenState: boolean;

  currentIconName: string;
  categoryColors: string[];
  currentColorIndex: number;
  icons: Icon[] = [];
  icons$: Observable<Icon[]>;

  destroy$: Subject<boolean>;

  constructor(
    private notification: NotificationService,
    private categoriesService: CategoriesService,
    private fb: UntypedFormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.icons = Object.values(MaterialIcons)
      .filter(icon => typeof icon !== 'number')
      .map(value => ({ name: value })) as Icon[];

    this.categoryColors = Object.values(CategoriesColors);

    this.createForm();

    this.icons$ = this.form.get('searchText').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value.trim()),
      filter(value => value !== ''),
      switchMap(value => {
        const filteredIcons: Icon[] = [];
        this.icons.forEach(icon => {
          if (icon.name.includes(value)) {
            filteredIcons.push(icon);
          }
        });

        return of(filteredIcons);
      })
    );
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required],
      searchText: ['']
    });
  }

  openPanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }

  selectColor(color: string, index: number): void {
    this.currentColorIndex = index;
    this.form.get('color').setValue(color);
  }

  selectIcon(icon: Icon): void {
    this.currentIconName = icon.name;
    this.form.get('icon').setValue(icon.name);
  }

  addCategory(): void {
    if (!this.currentIconName || !this.currentColorIndex) {
      this.notification.warn('Please select icon and color');
    }
    if (this.form.valid) {
      const params = this.form.value;

      const category = new Category(
        0,
        params.color,
        0,
        0,
        0,
        params.icon,
        0,
        params.name,
        false,
        []
      );

      this.categoriesService.importCategory(category).subscribe(() => {
        this.router.navigate(['/latest']);
        this.notification.success('Category successfully added');
      });
    }
  }
}

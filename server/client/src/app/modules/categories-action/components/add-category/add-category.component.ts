import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { MaterialIcons } from 'src/app/enums/material-icons-type';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(
    private notification: NotificationService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.icons = Object.values(MaterialIcons)
      .filter(icon => typeof icon !== 'number')
      .map(value => ({ name: value }));

    this.categoryColors = Object.values(CategoriesColors);

    this.createForm();

    this.icons$ = this.form.get('searchText').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value.trim()),
      filter(value => value !== ''),
      switchMap(value => {
        const filteredIcons = [];
        this.icons.map(icon => {
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

  selectIcon(icon): void {
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

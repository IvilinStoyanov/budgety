import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';
import { Categories } from 'src/app/enums/categories.enum';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  _categorySubscription: Subscription = new Subscription();

  form: FormGroup;
  categoryPicked: any;

  categories: any[] = [
    { id: Categories.Salary, icon: 'attach_money', name: 'Salary', color: CategoriesColors.Salary },
    { id: Categories.Car, icon: 'directions_car_filled', name: 'Car', color: CategoriesColors.Car },
    { id: Categories.Grocery, icon: 'shopping_cart', name: 'Grocery', color: CategoriesColors.Grocery },
    { id: Categories.Food, icon: 'restaurant', name: 'Food & Restaurant', color: CategoriesColors.Food },
    { id: Categories.Coffe, icon: 'local_cafe', name: 'Coffe', color: CategoriesColors.Coffe },
    { id: Categories.Holiday, icon: 'holiday_village', name: 'Holiday', color: CategoriesColors.Holiday },
    { id: Categories.Utilities, icon: 'receipt', name: 'Utilities', color: CategoriesColors.Utilities },
    { id: Categories.Rent, icon: 'bedroom_parent', name: 'Rent', color: CategoriesColors.Rent },
    { id: Categories.LoanPayments, icon: 'credit_score', name: 'Loan Payments', color: CategoriesColors.LoanPayments }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddItemComponent,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();

    var categorySubscription$ = this.form
      .get('category')
      .valueChanges.subscribe((value) => (this.categoryPicked = value?.name));

    var isTodaySubscription$ = this.form
      .get('isToday')
      .valueChanges.subscribe(value => this.setDatepickerValidation(value));

    this._categorySubscription.add(categorySubscription$);
    this._categorySubscription.add(isTodaySubscription$);
  }

  setDatepickerValidation(value: any): void {
    if (value) {
      this.form.get('dateCreated').disable();
    } else {
      this.form.get('dateCreated').enable();
      this.form.get('dateCreated').setValidators([Validators.required]);
      this.form.get('dateCreated').updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    this._categorySubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      type: [false, Validators.required],
      category: ['', Validators.required],
      value: ['', Validators.required],
      dateCreated: [{ value: '', disabled: true }],
      description: [''],
      isToday: [true],
    });
  }

  addItem() {
    if (this.form.valid) {
      if (this.form.get('type').value == false) {
        this.form.get('type').setValue('inc');
      } else {
        this.form.get('type').setValue('exp');
      }

      // set date
      let date = new Date(this.form.value.dateCreated);
      this.form.value.dateCreated = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();

      if (this.form.get('isToday').value) this.form.value.dateCreated = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toJSON()

      // modify form value
      let category = {
        category: this.form.value.category,
        items: {
          description: this.form.value.description,
          dateCreated: this.form.value.dateCreated,
          type: this.form.value.type,
          value: this.form.value.value,
        }
      }

      this.dialogRef.close(category);
    }
  }
}

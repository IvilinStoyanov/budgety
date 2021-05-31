import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

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
    { value: { icon: 'attach_money', name: 'Salary' }, viewValue: 'Salary' },
    { value: { icon: 'directions_car_filled', name: 'Car' }, viewValue: 'Car' },
    { value: { icon: 'shopping_cart', name: 'Grocery' }, viewValue: 'Grocery' },
    { value: { icon: 'restaurant', name: 'Food & Restaurant' }, viewValue: 'Food & Restaurant' },
    { value: { icon: 'local_cafe', name: 'Coffe' }, viewValue: 'Coffe' },
    { value: { icon: 'holiday_village', name: 'Holiday' }, viewValue: 'Holiday' },
    { value: { icon: 'receipt', name: 'Utilities' }, viewValue: 'Utilities' },
    { value: { icon: 'bedroom_parent', name: 'Rent' }, viewValue: 'Rent' },
    { value: { icon: 'credit_score', name: 'Loan Payments' }, viewValue: 'Loan Payments' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddItemComponent,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();

    var categorySubscription$ =  this.form.get('category').valueChanges.subscribe(value => this.categoryPicked = value?.name);

    this._categorySubscription.add(categorySubscription$);
  }

  ngOnDestroy() {
    this._categorySubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      value: ['', Validators.required],
    });
  }

  addItem() {
    this.dialogRef.close(this.form.value);
    this.form.reset();
  }
}

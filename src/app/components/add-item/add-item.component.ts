import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;

  categories: any[] = [
    { value: { icon: 'directions_car_filled', name: 'Car' }, viewValue: 'Car' },
    { value: { icon: 'shopping_cart', name: 'Grocery' }, viewValue: 'Grocery' },
    { value: { icon: 'attach_money', name: 'Salary' }, viewValue: 'Salary' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddItemComponent,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
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

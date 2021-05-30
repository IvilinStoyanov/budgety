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
    { value: 'directions_car_filled', viewValue: 'Car' },
    { value: 'shopping_cart', viewValue: 'Grocery' },
    { value: 'attach_money', viewValue: 'Salary' },
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
      type: ['inc'],
      description: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  addItem() {
    this.dialogRef.close(this.form.value);
    this.form.reset();
    // if (params.type === 'exp') {
    // this.form.get('type').setValue('exp');
    // } else {
    //   this.form.get('type').setValue('inc');
    // }
  }
}

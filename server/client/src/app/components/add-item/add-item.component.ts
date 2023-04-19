import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  private categorySubscription: Subscription = new Subscription();
  form: FormGroup;
  categoryPicked: any;
  templateData: any;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddItemComponent,
    private fb: FormBuilder
  ) {
    this.templateData = data;
  }

  ngOnInit() {
    this.createForm();

    const categorySubscription$ = this.form
      .get('category')
      .valueChanges.subscribe(value => (this.categoryPicked = value?.name));

    this.categorySubscription.add(categorySubscription$);
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

  createForm() {
    let type = false;

    if (this.templateData.viewMode === 'exp') { type = true; }

    this.form = this.fb.group({
      type: [type, Validators.required],
      category: [null, Validators.required],
      value: ['', Validators.required],
      dateCreated: [new Date(), Validators.required],
      description: [''],
      isToday: [true]
    });

    if (this.templateData.categories.length === 1) {
      this.categoryPicked = this.templateData.categories[0].name;
      this.form.get('category').setValue(this.templateData.categories[0]);
    }
  }

  addItem() {
    if (this.form.valid) {
      if (this.form.get('type').value === false) {
        this.form.get('type').setValue('inc');
      } else {
        this.form.get('type').setValue('exp');
      }

      // set date
      const date = new Date(this.form.value.dateCreated);
      this.form.value.dateCreated = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toJSON();

      if (this.form.get('isToday').value) {
        this.form.value.dateCreated = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        ).toJSON();
      }

      console.log(this.form);
      const transaction = {
        _categoryId: this.form.value.category._id,
        description: this.form.value.description,
        dateCreated: this.form.value.dateCreated,
        type: this.form.value.type,
        value: parseFloat(this.form.value.value.toFixed(2))
      };

      this.dialogRef.close(transaction);
    }
  }
}

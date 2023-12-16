import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import { AddItemModalData } from 'src/app/shared/models/interface/add-item-modal-data';
import { ITransaction } from 'src/app/shared/models/interface/transaction';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
// TODO: rename to AddTransaction
export class AddItemComponent implements OnInit, OnDestroy {
  private categorySubscription: Subscription = new Subscription();
  form: UntypedFormGroup;
  categoryPicked: string;
  templateData: AddItemModalData;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddItemModalData,
    private fb: UntypedFormBuilder
  ) {
    this.templateData = data;
  }

  ngOnInit(): void {
    this.createForm();

    const categorySubscription$ = this.form
      .get('category')
      .valueChanges.subscribe(value => {
        this.categoryPicked = value?.name;
      });

    this.categorySubscription.add(categorySubscription$);
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  createForm(): void {
    let type = false;

    if (this.templateData.viewMode === 'exp') {
      type = true;
    }

    this.form = this.fb.group({
      type: [type, Validators.required],
      category: [null, Validators.required],
      value: ['', Validators.required],
      dateCreated: [new Date(), Validators.required],
      description: ['']
    });

    if (this.templateData.categories.length === 1) {
      this.categoryPicked = this.templateData.categories[0].name;
      this.form.get('category').setValue(this.templateData.categories[0]);
    }
  }

  addItem(): void {
    if (this.form.valid) {
      if (this.form.get('type').value === false) {
        this.form.get('type').setValue('inc');
      } else {
        this.form.get('type').setValue('exp');
      }

      // set date
      this.form.value.dateCreated = new Date(
        this.form.value.dateCreated
      ).toUTCString();


      const transaction: ITransaction = {
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

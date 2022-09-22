import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.scss']
})
export class BalanceModalComponent implements OnInit {
  form: FormGroup;
  data: any;

  constructor(
    public dialogRef: MatDialogRef<BalanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: BalanceModalComponent,
    private fb: FormBuilder
  ) {
    this.data = modalData;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      savings: [this.data.savings],
      budget: [this.data.budget]
    });
  }

  save() {
    this.dialogRef.close(this.form.get('savings').value);
  }

}

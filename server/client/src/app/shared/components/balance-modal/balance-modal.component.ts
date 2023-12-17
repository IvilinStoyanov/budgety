import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/shared/models/interface/User';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.scss']
})
export class BalanceModalComponent implements OnInit {
  form: UntypedFormGroup;
  user: IUser;

  constructor(
    public dialogRef: MatDialogRef<BalanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: UntypedFormBuilder
  ) {
    this.user = data;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      savings: [this.user.savings],
      budget: [this.user.inc - this.user.exp]
    });
  }

  save(): void {
    this.dialogRef.close(this.form.get('savings').value);
  }
}

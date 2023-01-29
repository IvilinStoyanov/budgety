import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/models/interface/User';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.scss']
})
export class BalanceModalComponent implements OnInit {
  form: FormGroup;
  user: IUser;

  constructor(
    public dialogRef: MatDialogRef<BalanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder
  ) {
    this.user = data;
  }

  ngOnInit() {
    this.createForm();
    console.log(this.user);
  }

  createForm() {
    this.form = this.fb.group({
      savings: [this.user.savings],
      budget: [this.user.inc - this.user.exp]
    });
  }

  save() {
    this.dialogRef.close(this.form.get('savings').value);
  }

}

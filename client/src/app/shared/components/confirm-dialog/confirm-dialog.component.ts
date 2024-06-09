import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransaction } from '../../models/interface/transaction';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  item: ITransaction;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogComponent
  ) {
    this.title = data.title;
    this.message = data.message;
    this.item = data.item;
  }
  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.item);
  }
}

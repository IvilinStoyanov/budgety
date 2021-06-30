import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  item: any;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogComponent
  ) {
    this.title = data.title;
    this.message = data.message;
    this.item = data.item
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(this.item);
  }

}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public snackbar: MatSnackBar) {}

  success(message: string): void {
    this.showNotification(message, 'sucess');
  }

  warn(message: string): void {
    this.showNotification(message, 'warn');
  }

  danger(message: string): void {
    this.showNotification(message, 'danger');
  }

  private showNotification(message: string, customClass: string): void {
    this.snackbar.open(message, 'close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: customClass
    });
  }
}

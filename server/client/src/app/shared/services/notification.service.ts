import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public snackbar: MatSnackBar) {}

  success(message: string) {
    this.showNotification(message, 'sucess');
  }

  warn(message: string) {
    this.showNotification(message, 'warn');
  }

  danger(message: string) {
    this.showNotification(message, 'danger');
  }

  private showNotification(message: string, customClass: string) {
    this.snackbar.open(message, 'close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: customClass
    });
  }
}

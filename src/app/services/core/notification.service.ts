import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type NotificationType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly defaultDuration = 3000;

  public success(
    message: string,
    type: NotificationType = 'success',
    duration = this.defaultDuration,
    config?: MatSnackBarConfig,
  ) {
    this.open(message, type, {
      ...config,
      duration,
      panelClass: [`snackbar-success`],
    });
  }

  public error(
    message: string,
    type: NotificationType = 'error',
    duration = this.defaultDuration,
    config?: MatSnackBarConfig,
  ) {
    this.open(message, type, {
      ...config,
      duration,
      panelClass: [`snackbar-error`],
    });
  }

  public open(
    message: string,
    type: NotificationType,
    config?: MatSnackBarConfig,
  ) {
    this.snackBar.open(message, undefined, {
      duration: this.defaultDuration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [`snackbar-${type}`],
      ...config,
    });
  }
}

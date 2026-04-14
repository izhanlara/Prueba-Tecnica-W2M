import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type NotificationType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly DEFAULT_DURATION = 3000;

  public messages(
    message: string,
    type: NotificationType = 'success',
    duration?: number,
    config?: MatSnackBarConfig,
  ) {
    this.snackBar.open(message, undefined, {
      duration: duration ?? this.DEFAULT_DURATION,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [`snackbar-${type}`],
      ...config,
    });
  }
}

import { Component, Injectable, inject } from '@angular/core';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-popup-modalEdit',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['../popup-modal.component.scss'],
  imports: [],
})
@Injectable({
  providedIn: 'root',
  useClass: PopupModalEditComponent,
})
export class PopupModalEditComponent {
  _snackBar = inject(MatSnackBar);
  message: string = 'Error';
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}

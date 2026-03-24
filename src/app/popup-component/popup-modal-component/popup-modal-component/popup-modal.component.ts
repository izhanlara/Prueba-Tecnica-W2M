import { Component, Injectable, signal, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

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
  message = signal<string>('');
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}

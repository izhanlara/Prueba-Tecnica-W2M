import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-popup-modalEdit',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['../popup-modal.component.scss'],
})
@Injectable({
  providedIn: 'root',
  useClass: PopupModalEditComponent,
})
export class PopupModalEditComponent {}

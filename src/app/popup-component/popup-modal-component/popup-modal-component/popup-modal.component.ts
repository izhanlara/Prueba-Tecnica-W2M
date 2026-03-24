import { Component, Injectable } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-popup-modalEdit',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['../popup-modal.component.scss'],
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule],
})
@Injectable({
  providedIn: 'root',
  useClass: PopupModalEditComponent,
})
export class PopupModalEditComponent {}

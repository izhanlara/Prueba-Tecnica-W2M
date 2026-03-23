import { Component, ChangeDetectionStrategy, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';
import { PopupModalService } from '../../../services/core/modal-services/popup-modal.services/popup-modal.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modalEdit-component/popup-modal.component';
@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatCheckboxModule],
})
@Injectable({
  providedIn: 'root',
  useClass: ModalEditHeroComponent,
})
export class ModalEditHeroComponent {
  readonly modalEditService = inject(ModalEditService);
  readonly popupModalService = inject(PopupModalService);

  popUpComponent = inject(PopupModalEditComponent);

  formControlUpdate = this.modalEditService.formControlUpdate;

  onSubmit() {
    this.modalEditService.updateHeroAsync();
  }

  viewPopup() {
    this.popUpComponent.controlPopup(2);
  }
}

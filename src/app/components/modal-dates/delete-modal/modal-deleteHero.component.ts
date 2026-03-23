import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalDeleteService } from '../../../services/core/modal-services/modal-delete.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modalEdit-component/popup-modal.component';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [MatButtonModule],
})
export class ModalDeleteHeroComponent {
  readonly modalDeleteService = inject(ModalDeleteService);
  popUpComponent = inject(PopupModalEditComponent);

  openModalDelete() {
    this.modalDeleteService.isOpen.set(true);
  }

  closeModalDelete() {
    this.modalDeleteService.closeModalDelete();
  }

  viewPopup() {
    this.popUpComponent.controlPopup(3);
  }
}

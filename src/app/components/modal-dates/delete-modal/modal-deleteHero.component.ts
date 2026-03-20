import { Component, inject } from '@angular/core';

import { ModalDeleteService } from '../../../services/core/modal-services/modal-delete.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
})
export class ModalDeleteHeroComponent {
  readonly modalDeleteService = inject(ModalDeleteService);

  openModalDelete() {
    this.modalDeleteService.isOpen.set(true);
  }

  closeModalDelete() {
    this.modalDeleteService.closeModalDelete();
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalDeleteService } from '../../../services/core/modal-services/modal-delete.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modal-component/popup-modal.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [MatButtonModule, MatIconModule],
})
export class ModalDeleteHeroComponent {
  readonly modalDeleteService = inject(ModalDeleteService);
  popUpComponent = inject(PopupModalEditComponent);
  message = signal<string>('Heroe Eliminado con éxito');

  openModalDelete() {
    this.modalDeleteService.isOpen.set(true);
  }

  closeModalDelete() {
    this.modalDeleteService.closeModalDelete();
  }
}

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalDeleteService } from '@services/core/modal-services/modal-delete.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-modalHero.html',
  styleUrls: ['../modal-styles.scss', './delete-modalHero.scss'],
  imports: [MatButtonModule, MatIconModule],
})
export class ModalDeleteHeroComponent {
  public readonly modalDeleteService = inject(ModalDeleteService);

  openModalDelete() {
    this.modalDeleteService.isOpen.set(true);
  }

  closeModalDelete() {
    this.modalDeleteService.closeModalDelete();
  }
}

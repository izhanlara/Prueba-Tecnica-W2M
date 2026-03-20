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

  // confirmDelete() {
  //   const index = this.selectedHeroIndex();
  //   if (index !== null) {
  //     const heroToDelete = this.herosJson.Hero()[index];

  //     const updatedAllHeroes = this.herosJson
  //       .allHeros()
  //       .filter((hero) => hero.nombre !== heroToDelete.nombre);
  //     this.herosJson.allHeros.set(updatedAllHeroes);

  //     this.herosJson.Hero.set(updatedAllHeroes.slice(0, 12));
  //   }
  //   this.closeModalDelete();
  // }
}

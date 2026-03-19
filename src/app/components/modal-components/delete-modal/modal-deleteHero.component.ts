import { Component, inject, signal } from '@angular/core';

import { HerosJson } from '../../../services/core/heros.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
})
export class ModalDeleteHeroComponent {
  private readonly herosJson = inject(HerosJson);
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly isOpen = signal(false);

  openModalDelete() {
    this.isOpen.set(true);
  }

  closeModalDelete() {
    this.isOpen.set(false);
  }

  confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index !== null) {
      const heroToDelete = this.herosJson.Hero()[index];

      const updatedAllHeroes = this.herosJson
        .allHeros()
        .filter((hero) => hero.nombre !== heroToDelete.nombre);
      this.herosJson.allHeros.set(updatedAllHeroes);

      this.herosJson.Hero.set(updatedAllHeroes.slice(0, 12));
    }
    this.closeModalDelete();
  }
}

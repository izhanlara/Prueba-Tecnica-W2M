import { inject, Injectable, signal } from '@angular/core';

import { HerosJson } from '../../../services/core/heros.service';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteService {
  private readonly herosJson = inject(HerosJson);
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly isOpen = signal(false);

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
  closeModalDelete() {
    this.isOpen.set(false);
  }
}

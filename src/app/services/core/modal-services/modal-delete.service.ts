import { inject, Injectable, signal } from '@angular/core';
import { HerosJson } from '@services/core/heros.service';
import { CoreModalServices } from './coreModal.service';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteService {
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly coreServices = inject(CoreModalServices);
  private readonly serviceHeros = inject(HerosJson);

  public confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index) {
      const heroToDelete = this.serviceHeros._hero()[index];
      this.serviceHeros.deleteHero(heroToDelete.id).subscribe(() => {
        const updatedAllHeroes = this.serviceHeros
          ._allHeros()
          .filter((hero) => hero.id !== heroToDelete.id);
        this.serviceHeros._allHeros.set(updatedAllHeroes);
        this.serviceHeros._hero.set(updatedAllHeroes.slice(0, 12));
      });
    }
    this.closeModalDelete();
  }

  public openModalDelete() {
    this.coreServices.openModal('delete');
  }

  public closeModalDelete() {
    this.coreServices.closeModal();
  }
}

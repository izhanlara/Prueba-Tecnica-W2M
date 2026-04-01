import { inject, Injectable, signal } from '@angular/core';
import { HerosJson } from '@services/core/heros.service';
import { CoreModalServices } from './coreModal.service';
import { Hero } from '@core/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteService {
  private readonly serviceHeros = inject(HerosJson);
  public readonly coreServices = inject(CoreModalServices);
  public readonly selectedHeroIndex = signal<number | null>(null);

  public confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index) {
      this.serviceHeros.getHeros().subscribe((heroes: Hero[]) => {
        const hero = heroes[index];
        this.serviceHeros.deleteHero(hero.id).subscribe(() => {
          this.serviceHeros.getHeros();
          return heroes.filter((h) => h.id !== hero.id);
        });
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

import { inject, Injectable, signal } from '@angular/core';
import { CoreModalServices } from './coreModal.service';
import { Hero } from '@services/core/heroes.model';
import { HerosJson } from '@services/core/heros.service';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly serviceHeros = inject(HerosJson);
  public readonly coreServices = inject(CoreModalServices);
  private readonly selectedHeroIndex = signal<number | null>(null);

  private readonly http = inject(HerosJson);

  public openModalEdit(hero: Hero, index: number) {
    this.selectedHeroIndex.set(index);
    this.coreServices.formControl.setValue({
      name: hero.name.toUpperCase(),
      description: hero.description,
      powers: hero.powers,
      location: hero.location,
      img: hero.img,
    });
    this.coreServices.openModal('edit');
  }

  public updateHero() {
    const index = this.selectedHeroIndex();
    if (index !== null) {
      this.serviceHeros.getHeros().subscribe((heroes) => {
        const updatedHero: Hero = {
          id: heroes[index].id,
          name: this.coreServices.formControl.value.name ?? '',
          description: this.coreServices.formControl.value.description ?? '',
          powers: this.coreServices.formControl.value.powers ?? '',
          location: this.coreServices.formControl.value.location ?? '',
          img: this.coreServices.formControl.value.img ?? '',
        };
        this.serviceHeros
          .updateHero(updatedHero.id, updatedHero)
          .subscribe(() => {
            this.serviceHeros.getHeros();
          });
      });
    }
    this.closeModalEdit();
  }

  public onSubmit() {
    this.updateHero();
  }

  public closeModalEdit() {
    this.coreServices.closeModal();
    this.coreServices.formControl.reset();
  }
}

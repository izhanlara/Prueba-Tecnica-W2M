import { inject, Injectable, signal } from '@angular/core';
import { CoreModalServices } from './coreModal.service';
import { Hero } from '@services/core/heroes.model';
import { HerosJson } from '@services/core/heros.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly serviceHeros = inject(HerosJson);
  public readonly coreServices = inject(CoreModalServices);
  private readonly selectedHeroIndex = signal<number | null>(null);

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
    const formValue = this.coreServices.formControl.getRawValue();

    this.serviceHeros.getHeros().subscribe((heroes: Hero[]) => {
      const heroToEdit = heroes[index ?? -1];
      if (heroToEdit) {
        const updatedHero: Hero = {
          id: heroToEdit.id,
          name: formValue.name,
          description: formValue.description,
          powers: formValue.powers,
          location: formValue.location,
          img: formValue.img || heroToEdit.img,
        };

        this.serviceHeros
          .updateHero(heroToEdit.id, updatedHero)
          .subscribe(() => {
            this.closeModalEdit();
          });
      }
    });
  }

  public onSubmit() {
    this.updateHero();
  }

  public closeModalEdit() {
    this.coreServices.closeModal();
    this.coreServices.formControl.reset();
  }
}

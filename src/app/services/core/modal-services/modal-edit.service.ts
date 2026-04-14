import { inject, Injectable, signal } from '@angular/core';
import { Hero } from '@services/core/heroes.model';
import { HerosJson } from '@services/core/heros.service';
import { CoreModalServices } from './core-modal.service';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly serviceHeros = inject(HerosJson);
  public readonly coreServices = inject(CoreModalServices);
  public readonly selectedHeroIndex = signal<number | null>(null);

  public openModalEdit(index: number) {
    this.selectedHeroIndex.set(index);
    this.serviceHeros.getHeros().subscribe((heroes: Hero[]) => {
      const hero = heroes[index];
      if (hero) {
        this.coreServices.formControl.setValue({
          title: hero.title.toUpperCase(),
          description: hero.description,
          subTitle: hero.subTitle,
          location: hero.location,
          img: hero.img,
        });
      }
      this.coreServices.openModal('edit');
    });
  }

  public updateHero() {
    const index = this.selectedHeroIndex();
    const formValue = this.coreServices.formControl.getRawValue();

    this.serviceHeros.getHeros().subscribe((heroes: Hero[]) => {
      const heroToEdit = heroes[index ?? -1];
      if (heroToEdit) {
        const updatedHero: Hero = {
          id: heroToEdit.id,
          title: formValue.title || heroToEdit.title,
          description: formValue.description || heroToEdit.description,
          subTitle: formValue.subTitle || heroToEdit.subTitle,
          location: formValue.location || heroToEdit.location,
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

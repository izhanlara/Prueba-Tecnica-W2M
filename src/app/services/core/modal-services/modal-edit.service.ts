import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CoreModalServices } from './coreModal.service';
import { Hero } from '@services/core/heroes.model';
import { HerosJson } from '@services/core/heros.service';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly serviceHeros = inject(HerosJson);
  private readonly selectedHeroIndex = signal<number | null>(null);
  private readonly http = inject(HttpClient);
  public readonly coreServices = inject(CoreModalServices);

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
    const oldHero = this.serviceHeros._hero()[index!];

    const formValue = this.coreServices.formControl.getRawValue();
    const updatedHero: Hero = {
      id: oldHero.id,
      name: formValue.name,
      description: formValue.description,
      powers: formValue.powers,
      location: formValue.location,
      img: formValue.img || oldHero.img,
    };
    this.http
      .put<Hero>(`/allHeros/${oldHero.id}`, updatedHero)
      .subscribe((savedHero) => {
        this.serviceHeros.updateHero(index!, savedHero);
        this.closeModalEdit();
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

import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from '../../../services/core/heroes.model';
import { HerosJson } from '../../../services/core/heros.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly herosJson = inject(HerosJson);
  private readonly selectedHeroIndex = signal<number | null>(null);
  private readonly http = inject(HttpClient);
  readonly isOpen = signal(false);
  private readonly Hero = this.herosJson.Hero;

  formControlUpdate = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    poderes: new FormControl(''),
    ubicacion: new FormControl(''),
    img: new FormControl(''),
  });

  openModalEdit(hero: Hero, index: number) {
    this.selectedHeroIndex.set(index);
    this.formControlUpdate.setValue({
      nombre: hero.nombre,
      descripcion: hero.descripcion,
      poderes: hero.poderes,
      ubicacion: hero.ubicacion,
      img: hero.img,
    });
    this.isOpen.set(true);
  }
  updateHeroAsync() {
    const index = this.selectedHeroIndex();

    if (index === null) {
      return;
    }

    const oldHero = this.Hero()[index];

    if (!oldHero) {
      return;
    }

    if (!oldHero.id) {
      return;
    }

    const updatedHero: Hero = {
      ...oldHero,
      nombre: this.formControlUpdate.get('nombre')?.value || oldHero.nombre,
      descripcion: this.formControlUpdate.get('descripcion')?.value || oldHero.descripcion,
      poderes: this.formControlUpdate.get('poderes')?.value || oldHero.poderes,
      ubicacion: this.formControlUpdate.get('ubicacion')?.value || oldHero.ubicacion,
      img: this.formControlUpdate.get('img')?.value || oldHero.img,
    };

    this.http
      .put<Hero>(`http://localhost:3000/allHeros/${oldHero.id}`, updatedHero)
      .subscribe((savedHero) => {
        this.herosJson.updateHero(index, savedHero);
        this.closeModalEdit();
      });
  }

  onFileChange(event: Event) {
    this.formControlUpdate.get('img')?.setValue('/img/default-hero.png');
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.formControlUpdate.get('img')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  closeModalEdit() {
    this.isOpen.set(false);
    this.selectedHeroIndex.set(null);
  }
}

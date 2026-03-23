import { Injectable, inject, signal } from '@angular/core';
import { HerosJson } from '../heros.service';
import { Hero } from '../heroes.model';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ModalAddService {
  readonly isOpen = signal(false);
  http = inject(HttpClient);
  private readonly herosJson = inject(HerosJson);
  private readonly Hero = this.herosJson.Hero;
  formControlAdd = new FormGroup({
    nombre: new FormControl(''),
    poderes: new FormControl(''),
    ubicacion: new FormControl(''),
    descripcion: new FormControl(''),
    img: new FormControl(''),
  });

  openAddHeroModal(hero: Hero) {
    this.formControlAdd.setValue({
      nombre: hero.nombre,
      poderes: hero.poderes,
      ubicacion: hero.ubicacion,
      descripcion: hero.descripcion,
      img: hero.img,
    });
    this.isOpen.set(true);
  }

  onSubmit() {
    const newHero: Hero = {
      nombre: this.formControlAdd.value.nombre || '',
      poderes: this.formControlAdd.value.poderes || '',
      ubicacion: this.formControlAdd.value.ubicacion || '',
      descripcion: this.formControlAdd.value.descripcion || '',
      img: this.formControlAdd.value.img || 'img/default-image-url.png',
    };
    const currentAllHeroes = this.herosJson.allHeros();

    this.http
      .post('http://localhost:3000/allHeros', [...currentAllHeroes, newHero])
      .subscribe(() => {
        this.herosJson.Hero.set(this.herosJson.allHeros().slice(0, 12));
        this.formControlAdd.reset();
        this.closeModalAdd();
      });
  }
  closeModalAdd() {
    this.isOpen.set(false);
  }
}

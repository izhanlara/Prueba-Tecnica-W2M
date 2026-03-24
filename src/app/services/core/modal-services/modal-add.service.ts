import { Injectable, inject, signal } from '@angular/core';
import { HerosJson } from '../heros.service';
import { Hero } from '../heroes.model';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modal-component/popup-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ModalAddService {
  readonly isOpen = signal(false);
  http = inject(HttpClient);
  private readonly herosJson = inject(HerosJson);
  private readonly Hero = this.herosJson.Hero;

  snackBar = inject(MatSnackBar);

  popUpComponent = inject(PopupModalEditComponent);
  formControlAdd = new FormGroup({
    nombre: new FormControl(),
    poderes: new FormControl(),
    ubicacion: new FormControl(),
    descripcion: new FormControl(),
    img: new FormControl(),
  });

  openAddHeroModal(hero: Hero) {
    this.isOpen.set(true);
    this.formControlAdd.setValue({
      nombre: hero.nombre,
      poderes: hero.poderes,
      ubicacion: hero.ubicacion,
      descripcion: hero.descripcion,
      img: hero.img,
    });
  }

  onSubmit() {
    const newHero: Hero = {
      nombre: this.formControlAdd.value.nombre,
      poderes: this.formControlAdd.value.poderes,
      ubicacion: this.formControlAdd.value.ubicacion,
      descripcion: this.formControlAdd.value.descripcion,
      img: this.formControlAdd.value.img || 'img/default-image-url.png',
    };

    if (this.formControlAdd.valid) {
      this.snackBar.open('Héroe añadido con éxito', '', {
        duration: 3000,
        panelClass: ['popup-modal-done'],
      });
    } else {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
    }

    this.http.post('http://localhost:3000/allHeros', newHero).subscribe(() => {
      this.formControlAdd.reset();
      this.closeModalAdd();
    });
  }

  onFileChange(event: Event) {
    this.formControlAdd.get('img')?.setValue('/img/default-hero.png');
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.formControlAdd.get('img')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  closeModalAdd() {
    this.isOpen.set(false);
  }
}

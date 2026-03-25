import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../../services/core/heroes.model';
import { HerosJson } from '../../../services/core/heros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ModalEditService {
  private readonly herosJson = inject(HerosJson);
  private readonly selectedHeroIndex = signal<number | null>(null);
  private readonly http = inject(HttpClient);
  readonly isOpen = signal(false);
  private readonly heroList = this.herosJson.Hero;
  readonly snackBar = inject(MatSnackBar);

  readonly formControlUpdate = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    poderes: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    ubicacion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    img: new FormControl('', { nonNullable: true }),
  });

  openModalEdit(hero: Hero, index: number) {
    this.selectedHeroIndex.set(index);
    this.formControlUpdate.reset({
      nombre: hero.nombre.toUpperCase(),
      descripcion: hero.descripcion,
      poderes: hero.poderes,
      ubicacion: hero.ubicacion,
      img: hero.img,
    });
    this.isOpen.set(true);
  }

  updateHeroAsync() {
    const index = this.selectedHeroIndex();

    if (index === null || this.formControlUpdate.invalid) {
      return;
    }

    const oldHero = this.heroList()[index];

    if (!oldHero?.id) {
      return;
    }

    const formValue = this.formControlUpdate.getRawValue();
    const updatedHero: Hero = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      poderes: formValue.poderes,
      ubicacion: formValue.ubicacion,
      img: formValue.img || oldHero.img,
    };

    this.http
      .put<Hero>(`http://localhost:3000/allHeros/${oldHero.id}`, updatedHero)
      .subscribe((savedHero) => {
        this.herosJson.updateHero(index, savedHero);
        this.closeModalEdit();
      });
  }

  onFileChange(event: Event) {
    this.formControlUpdate.controls.img.setValue('/img/default-hero.png');
    const input = event.target as HTMLInputElement;
    if (!input?.files?.[0]) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.formControlUpdate.controls.img.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.formControlUpdate.invalid) {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
      return;
    }
    this.updateHeroAsync();
    this.snackBar.open('Héroe editado con éxito', '', {
      duration: 3000,
      panelClass: ['popup-modal-done'],
    });
  }
  closeModalEdit() {
    this.isOpen.set(false);
    this.selectedHeroIndex.set(null);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero } from '../heroes.model';

@Injectable({
  providedIn: 'root',
})
export class ModalAddService {
  readonly isOpen = signal(false);
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);

  readonly formControlAdd = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    poderes: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    ubicacion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    img: new FormControl('img/default-image-url.png', { nonNullable: true }),
  });

  openAddHeroModal() {
    this.isOpen.set(true);
    this.formControlAdd.reset({
      nombre: '',
      poderes: '',
      ubicacion: '',
      descripcion: '',
      img: 'img/default-image-url.png',
    });
  }

  onSubmit() {
    this.formControlAdd.markAllAsTouched();

    if (this.formControlAdd.invalid) {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
      return;
    }

    const formValue = this.formControlAdd.getRawValue();
    const newHero: Hero = {
      nombre: formValue.nombre,
      poderes: formValue.poderes,
      ubicacion: formValue.ubicacion,
      descripcion: formValue.descripcion,
      img: formValue.img || 'img/default-image-url.png',
    };

    this.http.post('http://localhost:3000/allHeros', newHero).subscribe(() => {
      this.snackBar.open('Héroe añadido con éxito', '', {
        duration: 3000,
        panelClass: ['popup-modal-done'],
      });
      this.closeModalAdd();
    });
  }

  onFileChange(event: Event) {
    this.formControlAdd.controls.img.setValue('/img/default-hero.png');
    const input = event.target as HTMLInputElement;
    if (!input?.files?.[0]) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.formControlAdd.controls.img.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  closeModalAdd() {
    this.isOpen.set(false);
    this.formControlAdd.reset({
      nombre: '',
      poderes: '',
      ubicacion: '',
      descripcion: '',
      img: 'img/default-image-url.png',
    });
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero } from '../heroes.model';

@Injectable({
  providedIn: 'root',
})
export class ModalAddService {
  readonly isOpen = signal(false);
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);

  public readonly formControlAdd = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    powers: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    img: new FormControl('img/default-image-url.png', { nonNullable: true }),
  });

  public openAddHeroModal() {
    this.isOpen.set(true);
  }

  public onSubmit() {
    if (this.formControlAdd.invalid) {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
      return;
    }

    const formValue = this.formControlAdd.getRawValue();
    const newHero: Hero = {
      name: formValue.name,
      powers: formValue.powers,
      location: formValue.location,
      description: formValue.description,
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

  public onFileChange(event: Event) {
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

  public closeModalAdd() {
    this.formControlAdd.reset({
      name: '',
      powers: '',
      location: '',
      description: '',
      img: 'img/default-image-url.png',
    });
    this.isOpen.set(false);
  }
}

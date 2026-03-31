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
  private readonly heroList = this.herosJson._hero;
  readonly snackBar = inject(MatSnackBar);

  public readonly formControlUpdate = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    powers: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    img: new FormControl('', { nonNullable: true }),
  });

  public openModalEdit(hero: Hero, index: number) {
    this.selectedHeroIndex.set(index);
    this.formControlUpdate.setValue({
      name: hero.name.toUpperCase(),
      description: hero.description,
      powers: hero.powers,
      location: hero.location,
      img: hero.img,
    });
    this.isOpen.set(true);
  }

  public updateHero() {
    const index = this.selectedHeroIndex();
    const oldHero = this.heroList()[index!];

    const formValue = this.formControlUpdate.getRawValue();
    const updatedHero: Hero = {
      name: formValue.name,
      description: formValue.description,
      powers: formValue.powers,
      location: formValue.location,
      img: formValue.img || oldHero.img,
    };
    // TODO () revisar donde añadir este snackBar
    // this.snackBar.open('Héroe editado con éxito', '', {
    //   duration: 3000,
    //   panelClass: ['popup-modal-done'],
    // });
    this.http
      .put<Hero>(`/allHeros/${oldHero.id}`, updatedHero)
      .subscribe((savedHero) => {
        this.herosJson.updateHero(index!, savedHero);
        this.closeModalEdit();
      });
  }

  public onFileChange(event: Event) {
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

  public onSubmit() {
    this.updateHero();
  }

  public closeModalEdit() {
    this.isOpen.set(false);
    this.selectedHeroIndex.set(null);
  }
}

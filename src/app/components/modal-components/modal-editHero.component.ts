import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Hero, HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="modal-overlay">
        <h2>Editar héroe</h2>
        <form [formGroup]="formControlUpdate" (ngSubmit)="onSubmit()">
          <label for="nombre">Nombre:</label>
          <input id="nombre" formControlName="nombre" type="text" />
          <br />
          <label for="descripcion">Descripción:</label>
          <input id="descripcion" formControlName="descripcion" type="text" />
          <br />
          <label for="poderes">Poderes:</label>
          <input id="poderes" formControlName="poderes" type="text" />
          <br />
          <label for="ubicacion">Ubicación:</label>
          <input id="ubicacion" formControlName="ubicacion" type="text" />
          <br />
          <input type="file" name="img" id="img" (change)="onFileChange($event)" />
          <button type="submit">Actualizar</button>
          <button type="button" (click)="closeModalEdit()">Cerrar</button>
        </form>
      </div>
    }
  `,
  styleUrls: ['./modal-styles.scss'],
  imports: [ReactiveFormsModule],
})
export class ModalEditHeroComponent {
  private readonly herosJson = inject(HerosJson);
  private readonly selectedHeroIndex = signal<number | null>(null);

  readonly isOpen = signal(false);
  readonly Hero = this.herosJson.Hero;

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

  closeModalEdit() {
    this.isOpen.set(false);
    this.selectedHeroIndex.set(null);
  }

  formControlUpdate = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    poderes: new FormControl(''),
    ubicacion: new FormControl(''),
    img: new FormControl(''),
  });

  updateHeroAsync() {
    const index = this.selectedHeroIndex();

    if (index === null) {
      return;
    }

    const oldHero = this.Hero()[index];

    if (!oldHero) {
      return;
    }

    const updatedHero = {
      nombre: this.formControlUpdate.get('nombre')?.value || oldHero.nombre,
      descripcion: this.formControlUpdate.get('descripcion')?.value || oldHero.descripcion,
      poderes: this.formControlUpdate.get('poderes')?.value || oldHero.poderes,
      ubicacion: this.formControlUpdate.get('ubicacion')?.value || oldHero.ubicacion,
      img: this.formControlUpdate.get('img')?.value || oldHero.img,
    };

    this.herosJson.updateHero(index, updatedHero);
    this.closeModalEdit();
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

  onSubmit() {
    this.updateHeroAsync();
  }
}

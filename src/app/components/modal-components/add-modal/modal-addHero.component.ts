import { Component, signal, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { ModalEditHeroComponent } from '../edit-modal/modal-editHero.component';

import { Hero, HerosJson } from '../../../services/core/heros.service';

@Component({
  selector: 'app-modal-add-hero',
  templateUrl: './add-modalHero.html',
  styleUrls: ['../modal-styles.scss', '../../search-bar-component/search-bar-styles.scss'],
  imports: [MatIconModule, ReactiveFormsModule],
})
export class ModalAddHeroComponent {
  @ViewChild('modalEditHero', { static: true }) modalEditHero!: ModalEditHeroComponent;

  protected readonly isOpen = signal(false);

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

  closeModalAdd() {
    this.isOpen.set(false);
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
    this.herosJson.allHeros.set([...currentAllHeroes, newHero]);
    this.herosJson.Hero.set(this.herosJson.allHeros().slice(0, 12));
    this.formControlAdd.reset();
    this.closeModalAdd();
  }

  onFileChange(event: Event) {
    this.modalEditHero.onFileChange(event);
  }
}

import { Component, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HerosJson } from '../../services/core/heros.service';
import { Hero } from '../../services/core/heroes.model';
import { ModalEditHeroComponent } from '../modal-dates/edit-modal/modal-editHero.component';
import { ModalDeleteHeroComponent } from '../modal-dates/delete-modal/modal-deleteHero.component';
import { ModalEditService } from '../../services/core/modal-services/modal-edit.service';
import { ModalDeleteService } from '../../services/core/modal-services/modal-delete.service';

@Component({
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['../styles.components.scss', './card.component.scss'],
  imports: [
    ModalEditHeroComponent,
    ModalDeleteHeroComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CardComponentHeroComponent {
  readonly modalEditService = inject(ModalEditService);
  readonly modalDeleteService = inject(ModalDeleteService);

  hero!: Signal<Hero[]>;

  constructor(public herosJson: HerosJson) {
    this.herosJson.getInfoHeros();
    this.hero = this.herosJson.Hero;
  }

  editHeroModal(hero: Hero, index: number) {
    this.modalEditService.openModalEdit(hero, index);
  }

  deleteHeroModal(index: number) {
    this.modalDeleteService.selectedHeroIndex.set(index);
    this.modalDeleteService.isOpen.set(true);
  }

  primeraLetraMayuscula(nombre: string): string {
    if (!nombre) {
      return '';
    }
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }
}

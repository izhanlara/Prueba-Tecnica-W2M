import { Component, Signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Hero, HerosJson } from '../../services/core/heros.service';

import { ModalEditHeroComponent } from '../modal-components/edit-modal/modal-editHero.component';
import { ModalDeleteHeroComponent } from '../modal-components/delete-modal/modal-deleteHero.component';

@Component({
  selector: 'app-card-component-hero',
  templateUrl: './card-component.html',
  styleUrls: ['../styles.components.scss', './card-component-styles.scss'],
  imports: [CommonModule, ModalEditHeroComponent, ModalDeleteHeroComponent, MatIconModule],
})
export class CardComponentHeroComponent {
  @ViewChild('modalEditHero', { static: true }) modalEditHero!: ModalEditHeroComponent;
  @ViewChild('modalDeleteHero', { static: true }) modalDeleteHero!: ModalDeleteHeroComponent;
  Hero!: Signal<Hero[]>;

  constructor(public herosJson: HerosJson) {
    this.herosJson.getInfoHeros();
    this.Hero = this.herosJson.Hero;
  }

  editHeroModal(hero: Hero, index: number) {
    this.modalEditHero.openModalEdit(hero, index);
  }

  deleteHeroModal(index: number) {
    this.modalDeleteHero.selectedHeroIndex.set(index);
    this.modalDeleteHero.openModalDelete();
  }
}

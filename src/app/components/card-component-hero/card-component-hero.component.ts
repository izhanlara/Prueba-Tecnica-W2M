import { Component, Signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero, HerosJson } from '../../services/core/heros.service';

import { ModalEditHeroComponent } from '../modal-components/modal-editHero.component';

@Component({
  selector: 'app-card-component-hero',
  template: `
    <ng-container>
      <div *ngFor="let hero of Hero(); let i = index">
        <img [src]="hero.img" alt="{{ hero.nombre }}" />
        <h2>{{ hero.nombre }}</h2>
        <p>{{ hero.descripcion }}</p>
        <p>{{ hero.poderes }}</p>
        <p>{{ hero.ubicacion }}</p>
        <button (click)="editHeroModal(hero, i)">Editar</button>
      </div>
      <!-- <button (click)="Hero.deleteHeroModal()">Eliminar</button> -->
    </ng-container>
    <app-modal-edit-hero #modalEditHero />
  `,
  styleUrls: [],
  imports: [CommonModule, ModalEditHeroComponent],
})
export class CardComponentHeroComponent {
  @ViewChild('modalEditHero', { static: true }) modalEditHero!: ModalEditHeroComponent;
  Hero!: Signal<Hero[]>;

  constructor(public herosJson: HerosJson) {
    this.herosJson.getInfoHeros();
    this.Hero = this.herosJson.Hero;
  }

  editHeroModal(hero: Hero, index: number) {
    this.modalEditHero.openModalEdit(hero, index);
  }
}

import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importar CommonModule

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-card-component-hero',
  template: `
    <ng-container>
      <div *ngFor="let hero of Hero()">
        <img [src]="hero.img" alt="{{ hero.nombre }}" />
        <h2>{{ hero.nombre }}</h2>
        <p>{{ hero.descripcion }}</p>
        <p>{{ hero.poderes }}</p>
        <p>{{ hero.ubicacion }}</p>
      </div>
      <!--
      <button (click)="herosJson.actualizar()">Editar</button>
      <button (click)="Hero.delete()">Eliminar</button> -->
    </ng-container>
  `,
  styleUrls: [],
  imports: [CommonModule],
})
export class CardComponentHeroComponent {
  Hero!: Signal<any>;

  constructor(public herosJson: HerosJson) {
    this.herosJson.getInfoHeros();
    this.Hero = this.herosJson.Hero;
  }
}

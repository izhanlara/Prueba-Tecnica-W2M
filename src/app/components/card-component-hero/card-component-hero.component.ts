import { Component, Signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Hero, HerosJson } from '../../services/core/heros.service';

import { ModalEditHeroComponent } from '../modal-components/modal-editHero.component';
import { ModalDeleteHeroComponent } from '../modal-components/modal-deleteHero.component';

@Component({
  selector: 'app-card-component-hero',
  template: `
    <p class="titleSectionCards">Héroes más allá de la imaginación</p>
    <p class="descriptionSectionCards">
      Desde tiempos inmemoriales, la humanidad ha soñado con figuras <br />
      extraordinarias capaces de desafiar los límites de la realidad.
    </p>
    <div class="card-component-section">
      <div *ngFor="let hero of Hero(); let i = index" class="card-hero">
        <img [src]="hero.img" alt="{{ hero.nombre }}" />
        <p style="font-size: 1.5rem;">{{ hero.nombre }}</p>
        <p style="font-size: 0.875rem; font-weight: bold;">{{ hero.descripcion }}</p>
        <p style="font-size: 1rem;">{{ hero.poderes }}</p>
        <p style="font-size: 1rem;">{{ hero.ubicacion }}</p>
        <div class="card-buttons">
          <button (click)="editHeroModal(hero, i)" class="btn-edit">
            <svg
              class="pen-edit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.6822 3.69896L20.0535 5.07047H20.0525C20.9981 6.01521 20.9797 7.57198 20.0128 8.53999L9.63208 18.9165C9.34114 19.2075 8.98037 19.4248 8.58857 19.546L4.00143 20.9564C3.90639 20.9855 3.80941 21 3.71243 21C3.45931 21 3.21396 20.902 3.03163 20.7187C2.77755 20.4656 2.68736 20.0941 2.79403 19.7488L4.20412 15.1609C4.3234 14.77 4.54064 14.4092 4.83255 14.1172L15.2133 3.7397C15.6797 3.27218 16.2965 3.01029 16.9492 3.00059C17.6116 2.98604 18.2216 3.2392 18.6822 3.69896ZM8.30539 18.6188C8.5459 18.5451 8.76702 18.4112 8.9474 18.2318L8.9474 18.2327L16.9599 10.2229L13.5307 6.79311L5.51819 14.802C5.33878 14.9824 5.20398 15.2045 5.13028 15.4451L3.72019 20.033L8.30539 18.6188ZM17.9943 4.38265C17.4262 3.81447 16.5052 3.81447 15.9371 4.38265L14.2227 6.0973L17.6514 9.5266L19.3658 7.81195C19.9339 7.24377 19.9339 6.32256 19.3658 5.75437L17.9943 4.38265Z"
                fill="white"
              />
            </svg>
            Editar
          </button>
          <button (click)="deleteHeroModal(i)" class="btn-delete">Eliminar</button>
        </div>
      </div>
    </div>
    <app-modal-edit-hero #modalEditHero />
    <app-delete-btn #modalDeleteHero />
  `,
  styleUrls: ['../styles.components.scss'],
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

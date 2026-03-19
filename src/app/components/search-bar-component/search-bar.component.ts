import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ModalAddHeroComponent } from '../modal-components/add-modal/modal-addHero.component';

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar-styles.scss'],
  imports: [MatIconModule, ModalAddHeroComponent],
})
export class SearchBarComponent {
  @ViewChild('modalAddHero', { static: true }) modalAddHero!: ModalAddHeroComponent;

  constructor(public herosJson: HerosJson) {}
  filterHero(searchTerm: string) {
    if (!searchTerm) {
      this.herosJson.getInfoHeros();
      return;
    }
    const filteredHeroes = this.herosJson
      .Hero()
      .filter((hero: any) => hero.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    this.herosJson.Hero.set(filteredHeroes);
  }

  openAddHeroModal() {
    this.modalAddHero.openAddHeroModal({
      nombre: '',
      poderes: '',
      ubicacion: '',
      descripcion: '',
      img: '',
    });
  }
}

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-bar-container">
      <input
        type="text"
        placeholder="Busca un Héroe..."
        class="search-input"
        #searchInput
        class="bar-input"
      />
      <button type="button" (click)="filterHero(searchInput.value)" class="btn-search">
        <mat-icon>search</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['../styles.components.scss'],
  imports: [MatIconModule],
})
export class SearchBarComponent {
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
}

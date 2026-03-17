import { Component } from '@angular/core';

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-search-bar',
  template: `
    <ng-container>
      <input type="text" placeholder="Buscar..." class="search-input" #searchInput />
      <button type="button" (click)="filterHero(searchInput.value)">Search</button>
    </ng-container>
  `,
  styleUrls: [],
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
    console.log(filteredHeroes);
  }
}

import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero-component/hero.component';
import { CardComponentHeroComponent } from '../../components/card-component-hero/card-component-hero.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home-pages',
  template: `<app-hero-component /> <app-search-bar /><app-card-component-hero />`,
  styleUrls: [],
  imports: [HeroComponent, CardComponentHeroComponent, SearchBarComponent],
})
export class HomePage {}

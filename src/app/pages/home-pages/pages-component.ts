import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero-component/hero.component';
import { CardComponentHeroComponent } from '../../components/card-component-hero/card-component-hero.component';
import { SearchBarComponent } from '../../components/search-bar-component/search-bar.component';
import { FooterComponent } from '../../components/layout/footer-component/footer.component';

@Component({
  selector: 'app-home-pages',
  template: `<app-hero-component /> <app-search-bar /><app-card-component-hero /> <app-footer />`,
  styleUrls: [],
  imports: [HeroComponent, CardComponentHeroComponent, SearchBarComponent, FooterComponent],
})
export class HomePage {}

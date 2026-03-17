import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero.component';
import { CardComponentHeroComponent } from '../../components/card-component-hero/card-component-hero.component';

@Component({
  selector: 'app-home-pages',
  template: `<app-hero-component /> <app-card-component-hero />`,
  styleUrls: [],
  imports: [HeroComponent, CardComponentHeroComponent],
})
export class HomePage {}

import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { SpinnerComponent } from '@components/layout/loading-component/spinner/spinner';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { HeroComponent } from '@sections/section-hero/section-hero.component';

@Component({
  selector: 'app-home-pages',
  templateUrl: './page-home.component.html',
  imports: [HeroComponent, CardComponent, SearchBarComponent, SpinnerComponent],
})
export class HomePage {}

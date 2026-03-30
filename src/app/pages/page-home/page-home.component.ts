import { Component } from '@angular/core';
import { SpinnerComponent } from '../../components/layout/loading-component/spinner/spinner';
import { HeroComponent } from '@sections/section-hero/section-hero.component';
import { CardComponent } from '../../components/card/card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home-pages',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
  imports: [HeroComponent, CardComponent, SearchBarComponent, SpinnerComponent],
})
export class HomePage {}

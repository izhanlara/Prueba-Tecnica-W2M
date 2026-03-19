import { Component, inject } from '@angular/core';

import { SpinnerComponent } from '../../components/layout/loading-component/spinner/spinner';
import { HeroComponent } from '../../components/hero-component/hero.component';
import { CardComponentHeroComponent } from '../../components/card-component-hero/card-component-hero.component';
import { SearchBarComponent } from '../../components/search-bar-component/search-bar.component';
import { FooterComponent } from '../../components/layout/footer-component/footer.component';

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-home-pages',
  templateUrl: './pages-component.html',
  styleUrls: ['./home-pages-styles.scss'],
  imports: [
    HeroComponent,
    CardComponentHeroComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
  ],
})
export class HomePage {
  readonly herosJson = inject(HerosJson);

  showMore: boolean = false;

  showBtn() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.herosJson.Hero.set(this.herosJson.allHeros());
    } else {
      this.herosJson.Hero.set(this.herosJson.allHeros().slice(0, 12));
    }
  }
}

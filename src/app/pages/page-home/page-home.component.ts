import { Component, inject } from '@angular/core';
import { SpinnerComponent } from '../../components/layout/loading-component/spinner/spinner';
import { HeroComponent } from '../../sections/section-hero/section-hero.component';
import { CardComponentHeroComponent } from '../../components/card/card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FooterComponent } from '../../sections/section-footer/section-footer.component';
import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-home-pages',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
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

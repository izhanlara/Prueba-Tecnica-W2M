import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { SpinnerComponent } from '@components/layout/loading-component/spinner/spinner';
import { ModalDeleteHeroComponent } from '@components/modal-dates/delete-modal/modal-deleteHero.component';
import { ModalEditHeroComponent } from '@components/modal-dates/edit-modal/modal-editHero.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { FilterHeroPipe } from '@pipes/search-bar-pipe/search-bar.pipe';
import { HeroComponent } from '@sections/section-hero/section-hero.component';
import { SectionTitles } from '@sections/section-titles/section-titles.component';
import { Hero } from '@services/core/heroes.model';
@Component({
  selector: 'app-home-pages',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
  imports: [
    AsyncPipe,
    HeroComponent,
    CardComponent,
    SearchBarComponent,
    SpinnerComponent,
    ModalEditHeroComponent,
    ModalDeleteHeroComponent,
    SectionTitles,
    FilterHeroPipe,
  ],
})
export class HomePage {
  public readonly searchTerm = signal('');
  public readonly showAllHeroes = signal(false);

  public display(heroes: Hero[]) {
    return this.showAllHeroes() ? heroes : heroes.slice(0, 12);
  }

  public showMoreText(): boolean {
    return this.showAllHeroes();
  }

  public showMore() {
    this.showAllHeroes.update((value) => !value);
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { SpinnerComponent } from '@components/layout/loading-component/spinner/spinner';
import { ModalDeleteHeroComponent } from '@components/modal-dates/delete-modal/modal-deleteHero.component';
import { ModalEditHeroComponent } from '@components/modal-dates/edit-modal/modal-editHero.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { FilterHeroPipe } from '@pipes/search-bar-pipe/search-bar.pipe';
import { HeroComponent } from '@sections/section-hero/section-hero.component';
import { SectionTitles } from '@sections/section-titles/section-titles.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

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
  ],
})
export class HomePage {
  public readonly filterPipe = inject(FilterHeroPipe);
  private readonly showAllHeroes = new BehaviorSubject<boolean>(false);

  public readonly filteredCount = this.filterPipe.filteredHeroes.pipe(
    map((heroes) => heroes.length),
  );

  public readonly display = combineLatest([
    this.filterPipe.filteredHeroes,
    this.showAllHeroes,
  ]).pipe(map(([heroes, showAll]) => (showAll ? heroes : heroes.slice(0, 12))));

  public textBtn(): boolean {
    return this.showAllHeroes.getValue();
  }

  public showMore() {
    this.showAllHeroes.next(!this.showAllHeroes.getValue());
  }
}

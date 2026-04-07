import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalDeleteHeroComponent } from '@components/modal-dates/delete-modal/modal-deleteHero.component';
import { ModalEditHeroComponent } from '@components/modal-dates/edit-modal/modal-editHero.component';
import { FilterHeroPipe } from '@pipes/search-bar-pipe/search-bar.pipe';
import { Hero } from '@core/heroes.model';
import { ModalDeleteService } from '@services/core/modal-services/modal-delete.service';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    ModalDeleteHeroComponent,
    ModalEditHeroComponent,
  ],
})
export class CardComponent implements OnInit {
  public readonly modalEditService = inject(ModalEditService);
  public readonly modalDeleteService = inject(ModalDeleteService);
  public readonly filterHeroPipe = inject(FilterHeroPipe);
  public post$!: Observable<Hero[]>;
  public filteredCount$!: Observable<number>;
  public showMore: boolean = true;

  private readonly limit$ = new BehaviorSubject<number>(12);

  public ngOnInit(): Observable<Hero[]> {
    this.filteredCount$ = this.filterHeroPipe.filteredHeroes$.pipe(
      map((heroes) => heroes.length),
    );
    this.post$ = combineLatest([
      this.filterHeroPipe.filteredHeroes$,
      this.limit$,
    ]).pipe(
      map(([heroes, limit]) => {
        if (limit === Number.POSITIVE_INFINITY) {
          return heroes;
        }

        return heroes.slice(0, limit);
      }),
    );

    return this.post$;
  }

  public editHeroModal(hero: Hero, index: number) {
    return this.modalEditService.openModalEdit(hero, index);
  }

  public deleteHeroModal(index: number) {
    this.modalDeleteService.selectedHeroIndex.set(index);
    this.modalDeleteService.openModalDelete();
  }

  public upperCase(name: string) {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return '';
  }

  public showBtn(): Observable<Hero[]> {
    this.showMore = !this.showMore;
    this.limit$.next(this.showMore ? 12 : Number.POSITIVE_INFINITY);
    return this.post$;
  }
}

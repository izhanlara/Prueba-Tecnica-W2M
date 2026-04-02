import { inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Hero } from '@services/core/heroes.model';
import { HerosJson } from '@services/core/heros.service';
import { ModalAddService } from '@services/core/modal-services/modal-add.service';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterHero',
})
@Injectable({
  providedIn: 'root',
})
export class FilterHeroPipe implements PipeTransform {
  public readonly modalEditService = inject(ModalEditService);
  public readonly modalAddService = inject(ModalAddService);
  public readonly heroService = inject(HerosJson);

  private readonly searchTerm$ = new BehaviorSubject<string>('');
  private readonly heroes$ = this.heroService.getHeros();

  public readonly filteredHeroes$: Observable<Hero[]> = combineLatest([
    this.heroes$,
    this.searchTerm$,
  ]).pipe(
    map(([heroes, searchTerm]) => {
      if (!searchTerm) {
        return heroes;
      }

      return heroes.filter((hero) => {
        const heroName = (hero?.name ?? '').toLowerCase();
        return heroName.includes(searchTerm);
      });
    }),
  );

  transform(value: string) {
    const searchTerm = (value ?? '').trim().toLowerCase();
    return this.heroes$.pipe(
      map((heroes) => {
        if (!searchTerm) {
          return heroes;
        }
        return heroes.filter((hero) => {
          const heroName = (hero?.name ?? '').toLowerCase();
          return heroName.includes(searchTerm);
        });
      }),
    );
  }

  filterHero(searchTerm: string) {
    this.searchTerm$.next((searchTerm ?? '').trim().toLowerCase());
  }

  openAddHeroModal() {
    this.modalAddService.openAddHeroModal();
  }
}

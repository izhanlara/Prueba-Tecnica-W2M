import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoaderService } from './loader/loader';
import { Hero } from './heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  public readonly _hero = signal<Hero[]>([]);

  public readonly _allHeros = signal<Hero[]>([]);

  public readonly loaderService = inject(LoaderService);

  public readonly http = inject(HttpClient);

  public getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/allHeros');
  }

  updateHero(index: number, updatedHero: Hero) {
    const oldHero = this._hero()[index];

    const heroIdentifier = oldHero.id;
    this._allHeros.update((heroes) =>
      heroes.map((hero) => (hero.id === heroIdentifier ? updatedHero : hero)),
    );
    this._hero.update((heroes) =>
      heroes.map((hero) => (hero.id === heroIdentifier ? updatedHero : hero)),
    );
  }
}

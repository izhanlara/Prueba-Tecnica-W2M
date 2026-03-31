import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from './heroes.model';
import { LoaderService } from './loader/loader';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  // TODO () Quitar signal de storage
  public _hero = signal<Hero[]>([]);
  public readonly _allHeros = signal<Hero[]>([]);
  public readonly loaderService = inject(LoaderService);
  public readonly http = inject(HttpClient);

  private readonly apiUrl = '/allHeros';

  public getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }
  public updateHero(index: number, updatedHero: Hero) {
    return this.http.put<Hero>(`${this.apiUrl}/${updatedHero.id}`, updatedHero);
  }
  public deleteHero(id: number | string | undefined) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  public addHero(newHero: Hero) {
    return this.http.post<Hero>(`${this.apiUrl}`, newHero);
  }
}

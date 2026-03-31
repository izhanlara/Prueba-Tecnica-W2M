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
  // TODO () implmentar ruta en servicio update
  public updateHero(index: number, updatedHero: Hero) {
    return this.http.put<Hero>(
      `${this.apiUrl}/update/${updatedHero.id}`,
      updatedHero,
    );
  }
  // TODO (Done) revisar tipado
  public deleteHero(id: number | string | undefined) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // TODO () implmentar ruta en servicio add
  public addHero(newHero: Hero) {
    return this.http.post<Hero>(`${this.apiUrl}/add`, newHero);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Hero } from './heroes.model';
import { LoaderService } from './loader/loader';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  public readonly loaderService = inject(LoaderService);
  public readonly http = inject(HttpClient);
  private readonly snackBar = inject(NotificationService);
  private readonly apiUrl = '/allHeros';

  public getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  public updateHero(id: number, updatedHero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${id}`, updatedHero).pipe(
      tap(() => {
        this.snackBar.success('Héroe actualizado correctamente');
      }),
    );
  }

  public deleteHero(id: number): Observable<Hero[]> {
    return this.http.delete<Hero[]>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.snackBar.success('Héroe eliminado correctamente');
      }),
    );
  }

  public addHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}`, newHero).pipe(
      tap(() => {
        this.snackBar.success('Héroe agregado correctamente');
      }),
    );
  }
}

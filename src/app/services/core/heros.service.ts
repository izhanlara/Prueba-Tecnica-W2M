import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Hero } from './heroes.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(NotificationService);
  private readonly API_URL = '/allHeros';

  public getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.API_URL);
  }

  public updateHero(id: number, updatedHero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.API_URL}/${id}`, updatedHero).pipe(
      tap(() => {
        this.snackBar.messages('Héroe actualizado correctamente');
      }),
    );
  }

  public deleteHero(id: number): Observable<Hero[]> {
    return this.http.delete<Hero[]>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this.snackBar.messages('Héroe eliminado correctamente');
      }),
    );
  }

  public addHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.API_URL}`, newHero).pipe(
      tap(() => {
        this.snackBar.messages('Héroe agregado correctamente');
      }),
    );
  }
}

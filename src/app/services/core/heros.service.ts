import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
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
    return this.http.get<Hero[]>(this.API_URL).pipe(
      catchError((error) => {
        this.snackBar.messages('Error al cargar los héroes', 'error');
        throw error;
      }),
    );
  }

  public updateHero(id: number, updatedHero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.API_URL}/${id}`, updatedHero).pipe(
      tap(() => {
        this.snackBar.messages('Héroe actualizado correctamente');
      }),
      catchError((error) => {
        this.snackBar.messages('Error al actualizar el héroe', 'error');
        throw error;
      }),
    );
  }

  public deleteHero(id: number): Observable<Hero[]> {
    return this.http.delete<Hero[]>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        this.snackBar.messages('Héroe eliminado correctamente');
      }),
      catchError((error) => {
        this.snackBar.messages('Error al eliminar el héroe', 'error');
        throw error;
      }),
    );
  }

  public addHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.API_URL}`, newHero).pipe(
      tap(() => {
        this.snackBar.messages('Héroe agregado correctamente');
      }),
      catchError((error) => {
        this.snackBar.messages('Error al agregar el héroe', 'error');
        throw error;
      }),
    );
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader/loader';
import { Hero } from './heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  Hero = signal<Hero[]>([]);
  allHeros = signal<Hero[]>([]);

  jsonUrl = signal('http://localhost:3000/allHeros');
  constructor(
    private readonly http: HttpClient,
    private readonly loaderService: LoaderService,
  ) {}

  getInfoHeros() {
    this.loaderService.setLoading(true);
    this.http.get<Hero[]>(this.jsonUrl()).subscribe((data) => {
      this.allHeros.set(data);
      this.Hero.set(data.slice(0, 12));
      this.loaderService.setLoading(false);
    });
  }

  updateHero(index: number, updatedHero: Hero) {
    const oldHero = this.Hero()[index];

    if (!oldHero) {
      return;
    }

    const heroIdentifier = oldHero.id ?? oldHero.nombre;
    this.allHeros.update((heroes) =>
      heroes.map((hero) => ((hero.id ?? hero.nombre) === heroIdentifier ? updatedHero : hero)),
    );
    this.Hero.update((heroes) =>
      heroes.map((hero) => ((hero.id ?? hero.nombre) === heroIdentifier ? updatedHero : hero)),
    );
  }
}

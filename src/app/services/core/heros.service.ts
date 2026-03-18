import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Hero {
  nombre: string;
  poderes: string;
  descripcion: string;
  ubicacion: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  Hero = signal<Hero[]>([]);

  jsonUrl = 'json/heros.json';
  constructor(private readonly http: HttpClient) {}

  getInfoHeros() {
    this.http.get<Hero[]>(this.jsonUrl).subscribe((data) => {
      this.Hero.set(data);
    });
  }

  updateHero(index: number, updatedHero: Hero) {
    this.Hero.update((heroes) =>
      heroes.map((hero, currentIndex) => (currentIndex === index ? updatedHero : hero)),
    );
  }
}

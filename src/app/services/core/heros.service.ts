import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HerosJson {
  Hero = signal<any>([]);

  jsonUrl = 'json/heros.json';

  constructor(private readonly http: HttpClient) {}

  getInfoHeros() {
    this.http.get(this.jsonUrl).subscribe((data: any) => {
      this.Hero.set(data);
    });
  }
}

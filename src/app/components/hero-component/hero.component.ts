import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-component',
  standalone: true,
  template: `
    <ng-container>
      <img src="img/banner-superHero.png" alt="banner SuperHero!" class="hero-img" />
    </ng-container>
  `,
  styleUrls: [],
})
export class HeroComponent {}

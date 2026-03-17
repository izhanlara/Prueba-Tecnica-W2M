import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-component',
  imports: [NgOptimizedImage],
  standalone: true,
  template: `
    <ng-container>
      <img ngSrc="" alt="banner SuperHero!" />
    </ng-container>
  `,
  styleUrl: './hero-component.component.ts',
})
export class HeroComponent {}

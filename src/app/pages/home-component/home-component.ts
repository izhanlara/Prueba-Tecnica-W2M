import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero-section/hero-component.component';

@Component({
  selector: 'app-home-component',
  imports: [HeroComponent],
  template: `<app-hero-component />`,
  styleUrl: './home-component.scss',
})
export class HomeComponent {}

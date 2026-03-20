import { Component, signal } from '@angular/core';

import { HomePage } from './pages/page-home/page-home.component';

@Component({
  selector: 'app-root',
  imports: [HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('SuperHero');
}

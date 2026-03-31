import { Component } from '@angular/core';
import { HomePage } from './pages/page-home/page-home.component';
import { FooterComponent } from '@sections/section-footer/section-footer.component';

@Component({
  selector: 'app-root',
  imports: [HomePage, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

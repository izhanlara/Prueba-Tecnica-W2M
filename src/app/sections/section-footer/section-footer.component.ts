import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './section-footer.component.html',
  styleUrls: ['./section-footer.component.scss'],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}

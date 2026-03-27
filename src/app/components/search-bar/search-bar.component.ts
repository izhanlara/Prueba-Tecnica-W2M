import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalAddHeroComponent } from '../modal-dates/add-modal/modal-addHero.component';
import { FilterHeroPipe } from '../../pipes/search-bar-pipe/search-bar.pipe';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [MatIconModule, ModalAddHeroComponent],
})
export class SearchBarComponent {
  pipe = inject(FilterHeroPipe);

  openAddHeroModal() {
    this.pipe.openAddHeroModal();
  }
}

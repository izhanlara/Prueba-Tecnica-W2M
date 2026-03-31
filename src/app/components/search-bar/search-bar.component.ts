import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterHeroPipe } from '../../pipes/search-bar-pipe/search-bar.pipe';
import { ModalAddHeroComponent } from '../modal-dates/add-modal/modal-addHero.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [MatIconModule, ModalAddHeroComponent],
})
export class SearchBarComponent {
  public readonly pipe = inject(FilterHeroPipe);

  public openAddHeroModal() {
    this.pipe.openAddHeroModal();
  }
}

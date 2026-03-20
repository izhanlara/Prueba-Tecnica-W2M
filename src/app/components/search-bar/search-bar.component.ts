import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalAddHeroComponent } from '../modal-dates/add-modal/modal-addHero.component';
import { SearchBarService } from '../../services/core/search-bar-service/search-bar.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [MatIconModule, ModalAddHeroComponent],
})
export class SearchBarComponent {
  readonly searchBarService = inject(SearchBarService);

  openAddHeroModal() {
    this.searchBarService.openAddHeroModal();
  }
}

import { Component, inject, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalAddService } from '@services/core/modal-services/modal-add.service';
import { ModalAddHeroComponent } from '@modals/add-modal/modal-addHero.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [MatIconModule, ModalAddHeroComponent],
})
export class SearchBarComponent {
  public readonly searchTerm = model<string>('');
  private readonly modalAddService = inject(ModalAddService);

  public openAddHeroModal() {
    this.modalAddService.openAddHeroModal();
  }

  public emitSearchTerm(value: string) {
    this.searchTerm.set(value ?? ''.trim());
  }
}

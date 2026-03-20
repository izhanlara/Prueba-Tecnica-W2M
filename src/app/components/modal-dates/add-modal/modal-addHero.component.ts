import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';
import { ModalAddService } from '../../../services/core/modal-services/modal-add.service';
@Component({
  selector: 'app-modal-add-hero',
  templateUrl: './add-modalHero.html',
  styleUrls: ['../modal-styles.scss', '../../search-bar/search-bar.component.scss'],
  imports: [MatIconModule, ReactiveFormsModule],
})
export class ModalAddHeroComponent {
  readonly modalEditService = inject(ModalEditService);
  readonly modalAddService = inject(ModalAddService);

  closeModalAdd() {
    this.modalAddService.closeModalAdd();
  }

  onSubmit() {
    this.modalAddService.onSubmit();
  }
}

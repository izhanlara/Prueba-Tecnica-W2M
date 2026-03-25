import { Component, inject } from '@angular/core';
import { ModalAddService } from '../../../services/core/modal-services/modal-add.service';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-modal-add-hero',
  templateUrl: './add-modalHero.html',
  styleUrls: ['../modal-styles.scss', '../../search-bar/search-bar.component.scss'],
  imports: [FormComponent],
})
export class ModalAddHeroComponent {
  readonly modalAddService = inject(ModalAddService);

  closeModalAdd() {
    this.modalAddService.closeModalAdd();
  }

  onSubmit() {
    this.modalAddService.onSubmit();
  }
}

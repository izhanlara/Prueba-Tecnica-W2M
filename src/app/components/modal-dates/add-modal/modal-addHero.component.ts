import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAddService } from '../../../services/core/modal-services/modal-add.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modal-component/popup-modal.component';

@Component({
  selector: 'app-modal-add-hero',
  templateUrl: './add-modalHero.html',
  styleUrls: ['../modal-styles.scss', '../../search-bar/search-bar.component.scss'],
  imports: [MatIconModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule],
})
export class ModalAddHeroComponent {
  readonly modalAddService = inject(ModalAddService);
  readonly popUpComponent = inject(PopupModalEditComponent);
  message = signal<string>('Heroe Añadido correctamente');

  closeModalAdd() {
    this.modalAddService.closeModalAdd();
  }

  onSubmit() {
    this.modalAddService.onSubmit();
  }
}

import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { FormComponent } from '@form/form.component';

@Component({
  selector: 'app-modal-edit-hero',
  templateUrl: './edit-modalHero.html',
  styleUrls: [
    '../modal-styles.scss',
    '../../../popup-component/popup-modal-component/popup-modal.component.scss',
  ],
  imports: [FormComponent],
})
export class ModalEditHeroComponent {
  public readonly modalEditService = inject(ModalEditService);
  public readonly snackBar = inject(MatSnackBar);
  public readonly formControlUpdate = this.modalEditService.formControlUpdate;

  onSubmit() {
    this.modalEditService.onSubmit();
  }
}

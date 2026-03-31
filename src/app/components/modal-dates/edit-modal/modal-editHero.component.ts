import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { FormComponent } from '@form/form.component';
import { CoreModalServices } from '@core/modal-services/coreModal.service';
@Component({
  selector: 'app-modal-edit-hero',
  templateUrl: './edit-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [FormComponent],
})
export class ModalEditHeroComponent {
  public readonly modalEditService = inject(ModalEditService);
  public readonly coreModal = inject(CoreModalServices);
  public readonly snackBar = inject(MatSnackBar);

  onSubmit() {
    this.modalEditService.onSubmit();
  }
}

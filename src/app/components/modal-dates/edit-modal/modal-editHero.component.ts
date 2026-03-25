import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormComponent } from '../../form/form.component';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';

@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modalHero.html',
  styleUrls: [
    '../modal-styles.scss',
    '../../../popup-component/popup-modal-component/popup-modal.component.scss',
  ],
  imports: [FormComponent],
})
export class ModalEditHeroComponent {
  readonly modalEditService = inject(ModalEditService);
  readonly snackBar = inject(MatSnackBar);
  readonly formControlUpdate = this.modalEditService.formControlUpdate;

  onSubmit() {
    this.formControlUpdate.markAllAsTouched();

    if (this.formControlUpdate.invalid) {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
      return;
    }

    this.modalEditService.updateHeroAsync();
    this.snackBar.open('Héroe editado con éxito', '', {
      duration: 3000,
      panelClass: ['popup-modal-done'],
    });
  }
}

import { Component, ChangeDetectionStrategy, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modal-component/popup-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modalHero.html',
  styleUrls: [
    '../modal-styles.scss',
    '../../../popup-component/popup-modal-component/popup-modal.component.scss',
  ],
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatCheckboxModule],
})
@Injectable({
  providedIn: 'root',
  useClass: ModalEditHeroComponent,
})
export class ModalEditHeroComponent {
  readonly modalEditService = inject(ModalEditService);
  popUpComponent = inject(PopupModalEditComponent);
  snackBar = inject(MatSnackBar);

  formControlUpdate = this.modalEditService.formControlUpdate;

  onSubmit() {
    if (this.formControlUpdate.valid) {
      this.snackBar.open('Héroe editado con éxito', '', {
        duration: 3000,
        panelClass: ['popup-modal-done'],
      });
      this.formControlUpdate.reset();
      this.modalEditService.updateHeroAsync();
    } else {
      this.snackBar.open('Error', '', {
        duration: 3000,
        panelClass: ['popup-modal-error'],
      });
    }
  }
}

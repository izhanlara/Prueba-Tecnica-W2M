import { Component, ChangeDetectionStrategy, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';

@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [ReactiveFormsModule, MatIconModule],
})
@Injectable({
  providedIn: 'root',
  useClass: ModalEditHeroComponent,
})
export class ModalEditHeroComponent {
  readonly modalEditService = inject(ModalEditService);

  formControlUpdate = this.modalEditService.formControlUpdate;

  onSubmit() {
    this.modalEditService.updateHeroAsync();
  }
}

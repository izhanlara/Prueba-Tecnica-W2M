import { Component, ChangeDetectionStrategy, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalEditService } from '../../../services/core/modal-services/modal-edit.service';

@Component({
  selector: 'app-modal-edit-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modalHero.html',
  styleUrls: ['../modal-styles.scss'],
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatCheckboxModule],
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

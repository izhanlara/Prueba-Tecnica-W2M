import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeroFormGroup } from '@components/models/form.modal';
import { CoreModalServices } from '@core/modal-services/core-modal.service';
@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['../modal-dates/modal-styles.scss'],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class FormComponent {
  public readonly form = input.required<HeroFormGroup>();
  public readonly mode = input<'add' | 'edit'>('add');
  public coreModal = inject(CoreModalServices);
  public readonly fileChange = output<Event>();
  public readonly submitForm = output<void>();

  public control(title: keyof HeroFormGroup['controls']) {
    return this.form().controls[title];
  }

  public hasError(title: keyof HeroFormGroup['controls'], error: string) {
    const targetControl = this.control(title);
    return targetControl.touched && targetControl.hasError(error);
  }

  public onSubmit() {
    this.form();
    if (this.form().invalid) {
      return;
    }
    this.submitForm.emit();
  }

  public onCancel() {
    this.coreModal.closeModal();
  }

  public onFileInputChange(event: Event) {
    this.coreModal.onFileChange(event);
  }
}

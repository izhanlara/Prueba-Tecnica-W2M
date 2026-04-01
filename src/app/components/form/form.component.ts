import { Component, input, output, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModalServices } from '@services/core/modal-services/coreModal.service';

export type HeroFormGroup = FormGroup<{
  name: FormControl<string>;
  powers: FormControl<string>;
  location: FormControl<string>;
  description: FormControl<string>;
  img: FormControl<string>;
}>;

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

  public control(name: keyof HeroFormGroup['controls']) {
    return this.form().controls[name];
  }

  public hasError(name: keyof HeroFormGroup['controls'], error: string) {
    const targetControl = this.control(name);
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

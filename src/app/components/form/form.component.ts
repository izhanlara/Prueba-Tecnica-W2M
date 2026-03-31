import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  public readonly mode = input<'add' | 'edit' | 'delete'>('add');
  public readonly submitForm = output<void>();
  public readonly cancelForm = output<void>();
  public readonly fileChange = output<Event>();

  public readonly fileName = signal('Sin archivos seleccionados');

  control(name: keyof HeroFormGroup['controls']) {
    return this.form().controls[name];
  }

  hasError(name: keyof HeroFormGroup['controls'], error: string) {
    const targetControl = this.control(name);
    return targetControl.touched && targetControl.hasError(error);
  }

  onSubmit() {
    this.form();
    if (this.form().invalid) {
      return;
    }
    this.submitForm.emit();
  }

  onCancel() {
    this.cancelForm.emit();
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileName.set(input.files?.[0]?.name ?? 'Sin archivos seleccionados');
    this.fileChange.emit(event);
  }
}

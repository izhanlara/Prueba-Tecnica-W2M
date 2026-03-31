import { Component, computed, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  readonly form = input.required<HeroFormGroup>();
  readonly mode = input<'add' | 'edit'>('add');
  readonly submitForm = output<void>();
  readonly cancelForm = output<void>();
  readonly fileChange = output<Event>();

  readonly fileName = signal('Sin archivos seleccionados');
  readonly title = computed(() =>
    this.mode() === 'add' ? 'Crear nuevo héroe' : 'Editar héroe',
  );
  readonly submitLabel = computed(() =>
    this.mode() === 'add' ? 'Crear héroe' : 'Guardar cambios',
  );

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

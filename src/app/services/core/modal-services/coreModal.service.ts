import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type ModalType = 'add' | 'delete' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class CoreModalServices {
  public readonly activeModal = signal<ModalType | null>(null);

  public openModal(modal: ModalType) {
    this.activeModal.set(modal);
  }

  public closeModal() {
    this.activeModal.set(null);
    this.formControl.reset({
      name: '',
      powers: '',
      location: '',
      description: '',
      img: 'img/default-image-url.png',
    });
  }

  public isOpen(modal: ModalType) {
    return this.activeModal() === modal;
  }

  public readonly formControl = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    powers: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    img: new FormControl('', { nonNullable: true }),
  });

  public onFileChange(event: Event) {
    this.formControl.controls.img.setValue('/img/default-hero.png');
    const input = event.target as HTMLInputElement;
    if (!input?.files?.[0]) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.formControl.controls.img.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}

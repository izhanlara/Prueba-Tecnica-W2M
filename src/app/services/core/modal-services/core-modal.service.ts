import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HeroFormGroup } from '@components/models/form.modal';

export type ModalType = 'add' | 'delete' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class CoreModalServices {
  public readonly activeModal = signal<ModalType | null>(null);
  private readonly formBuilder = inject(FormBuilder);

  public openModal(modal: ModalType) {
    this.activeModal.set(modal);
  }

  public closeModal() {
    this.activeModal.set(null);
    this.formControl.reset({
      title: '',
      subTitle: '',
      location: '',
      description: '',
      img: 'img/default-image-url.png',
    });
  }

  public isOpen(modal: ModalType) {
    return this.activeModal() === modal;
  }

  public readonly formControl: HeroFormGroup =
    this.formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      subTitle: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      img: ['img/default-image-url.png'],
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

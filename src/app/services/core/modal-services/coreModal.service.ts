import { Injectable, signal } from '@angular/core';

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
  }

  public isOpen(modal: ModalType) {
    return this.activeModal() === modal;
  }
}

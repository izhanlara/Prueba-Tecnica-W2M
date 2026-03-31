import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreModalServices {
  public isOpen = signal(false);

  public openModal() {
    this.isOpen.set(true);
  }

  public closeModal() {
    this.isOpen.set(false);
  }
}

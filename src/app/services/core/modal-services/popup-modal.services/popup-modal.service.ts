import { signal, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupModal } from './popup-model';

@Injectable({
  providedIn: 'root',
})
export class PopupModalService {
  confirmationMessageUrl = 'json/messagesConfirmation.json';
  confirmationMessage = signal<PopupModal[]>([]);
  idMessage = signal(0);
  popUpVisible = signal(false);

  constructor(private readonly http: HttpClient) {
    this.loadConfirmationMessages();
  }

  changeMessage(id: number) {
    this.idMessage.set(id);
  }

  loadConfirmationMessages() {
    fetch(this.confirmationMessageUrl)
      .then((response) => response.json())
      .then((data: PopupModal[]) => {
        this.confirmationMessage.set(data);
      })
      .catch((error) => {
        this.idMessage.set(4);
        this.showPopup();
        this.closePopupTimeOut();
        console.error('Error loading confirmation messages:', error);
      });
  }

  messageById() {
    return this.confirmationMessage().find((item) => item.id === this.idMessage())?.message ?? '';
  }

  showPopup() {
    this.popUpVisible.set(true);
  }

  closePopupTimeOut() {
    setTimeout(() => {
      this.popUpVisible.set(false);
    }, 3000);
  }

  isPopupVisible() {
    return this.popUpVisible();
  }
}

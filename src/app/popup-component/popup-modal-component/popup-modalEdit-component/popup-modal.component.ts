import { Component, Injectable } from '@angular/core';
import { PopupModalService } from '../../../services/core/modal-services/popup-modal.services/popup-modal.service';

@Component({
  selector: 'app-popup-modalEdit',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['../popup-modal.component.scss'],
})
@Injectable({
  providedIn: 'root',
  useClass: PopupModalEditComponent,
})
export class PopupModalEditComponent {
  constructor(public popupModalService: PopupModalService) {}

  get message() {
    return this.popupModalService.messageById();
  }

  controlPopup(id: number) {
    this.popupModalService.changeMessage(id);
    this.popupModalService.showPopup();
    this.popupModalService.closePopupTimeOut();
  }
}

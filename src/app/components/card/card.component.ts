import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '@core/heroes.model';
import { ModalDeleteService } from '@services/core/modal-services/modal-delete.service';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';

@Component({
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [TitleCasePipe, MatIconModule, MatButtonModule],
})
export class CardComponent {
  public readonly card = input.required<Hero>();
  public readonly index = input.required<number>();
  private readonly modalEditService = inject(ModalEditService);
  private readonly modalDeleteService = inject(ModalDeleteService);

  public editHeroModal() {
    return this.modalEditService.openModalEdit(this.card(), this.index());
  }

  public deleteHeroModal() {
    this.modalDeleteService.selectedHeroIndex.set(this.index());
    this.modalDeleteService.openModalDelete();
  }
}

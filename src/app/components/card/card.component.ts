import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponentOutputs } from '@components/models/card-action.modal';
import { Card } from '@components/models/card.model';
@Component({
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [TitleCasePipe, MatIconModule, MatButtonModule],
})
export class CardComponent {
  public readonly card = input.required<Card>();
  public readonly index = input.required<number>();
  public readonly heroAction = output<CardComponentOutputs>();

  public edit(): void {
    this.heroAction.emit({
      type: 'edit',
      payload: {
        id: this.index(),
      },
    });
  }

  public delete(): void {
    this.heroAction.emit({
      type: 'delete',
      payload: {
        id: this.index(),
      },
    });
  }
}

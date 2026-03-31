import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalDeleteHeroComponent } from '@components/modal-dates/delete-modal/modal-deleteHero.component';
import { ModalEditHeroComponent } from '@components/modal-dates/edit-modal/modal-editHero.component';
import { Hero } from '@core/heroes.model';
import { HerosJson } from '@core/heros.service';
import { ModalDeleteService } from '@services/core/modal-services/modal-delete.service';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    ModalDeleteHeroComponent,
    ModalEditHeroComponent,
  ],
})
export class CardComponent implements OnInit {
  public readonly modalEditService = inject(ModalEditService);
  public readonly modalDeleteService = inject(ModalDeleteService);
  public readonly herosJson = inject(HerosJson);

  public showMore: boolean = true;

  public ngOnInit() {
    this.herosJson
      .getHeros()
      .pipe(
        finalize(() => {
          if (this.showMore) {
            this.herosJson._hero.set(this.herosJson._allHeros().slice(0, 12));
          } else {
            this.herosJson._hero.set(this.herosJson._allHeros());
          }
        }),
      )
      .subscribe((heros) => {
        this.herosJson._allHeros.set(heros);
      });
  }

  public editHeroModal(hero: Hero, index: number) {
    return this.modalEditService.openModalEdit(hero, index);
  }

  public deleteHeroModal(index: number) {
    this.modalDeleteService.selectedHeroIndex.set(index);
    this.modalDeleteService.openModalDelete();
  }

  public upperCase(name: string) {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return '';
  }

  public showBtn(): Observable<Hero[]> {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.herosJson._hero.set(this.herosJson._allHeros().slice(0, 12));
    } else {
      this.herosJson._hero.set(this.herosJson._allHeros());
    }
    return this.herosJson.getHeros();
  }
}

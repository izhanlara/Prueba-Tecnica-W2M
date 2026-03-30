import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { finalize } from 'rxjs/operators';

import { HerosJson } from '@core/heros.service';
import { Hero } from '@core/heroes.model';

import { ModalDeleteHeroComponent } from '@components/modal-dates/delete-modal/modal-deleteHero.component';
import { ModalDeleteService } from '@services/core/modal-services/modal-delete.service';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { ModalEditHeroComponent } from '@components/modal-dates/edit-modal/modal-editHero.component';

import { FooterComponent } from '@sections/section-footer/section-footer.component';

@Component({
  standalone: true,
  selector: 'app-card-component-hero',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    FooterComponent,
    ModalDeleteHeroComponent,
    ModalEditHeroComponent,
  ],
})
export class CardComponent implements OnInit {
  public readonly modalEditService = inject(ModalEditService);
  public readonly modalDeleteService = inject(ModalDeleteService);
  public readonly herosJson = inject(HerosJson);
  public readonly _hero = this.herosJson._hero;
  public showMore: boolean = true;

  public ngOnInit() {
    this.herosJson
      .getHeros()
      .pipe(finalize(() => this.herosJson.loaderService.hideLoader()))
      .subscribe((heros) => {
        this.herosJson._allHeros.set(heros);
        this.herosJson._hero.set(heros.slice(0, 12));
      });
  }

  public editHeroModal(hero: Hero, index: number) {
    this.modalEditService.openModalEdit(hero, index);
  }

  public deleteHeroModal(index: number) {
    this.modalDeleteService.selectedHeroIndex.set(index);
    this.modalDeleteService.isOpen.set(true);
  }

  public primeraLetraMayuscula(nombre: string): string {
    if (!nombre) {
      return '';
    }
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  public showBtn() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.herosJson._hero.set(this.herosJson._allHeros().slice(0, 12));
    } else {
      this.herosJson._hero.set(this.herosJson._allHeros());
    }
  }
}

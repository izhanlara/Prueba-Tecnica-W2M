import { inject, Injectable } from '@angular/core';
import { ModalEditService } from '../modal-services/modal-edit.service';
import { ModalAddService } from '../modal-services/modal-add.service';
import { HerosJson } from '../heros.service';
@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  readonly modalEditService = inject(ModalEditService);
  readonly modalAddService = inject(ModalAddService);
  constructor(public herosJson: HerosJson) {}
  filterHero(searchTerm: string) {
    if (!searchTerm) {
      this.herosJson.getInfoHeros();
      return;
    }
    const filteredHeroes = this.herosJson
      .Hero()
      .filter((hero: any) => hero.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    this.herosJson.Hero.set(filteredHeroes);
  }

  openAddHeroModal() {
    this.modalAddService.openAddHeroModal({
      nombre: '',
      poderes: '',
      ubicacion: '',
      descripcion: '',
      img: '',
    });
  }
}

import { Injectable, inject, Pipe } from '@angular/core';
import { ModalEditService } from '../../services/core/modal-services/modal-edit.service';
import { ModalAddService } from '../../services/core/modal-services/modal-add.service';
import { HerosJson } from '../../services/core/heros.service';

interface PipeTransform {
  transform(value: any, ...args: any[]): any;
}

@Pipe({
  name: 'filterHero',
})
@Injectable({
  providedIn: 'root',
})
export class FilterHeroPipe implements PipeTransform {
  readonly modalEditService = inject(ModalEditService);
  readonly modalAddService = inject(ModalAddService);
  readonly herosJson = inject(HerosJson);

  constructor() {
    this.herosJson.getInfoHeros();
  }

  transform(value: any[], ...args: any[]) {
    const searchTerm = args[0];
    if (!searchTerm) {
      this.herosJson.getInfoHeros();
      return value;
    }
    const filteredHeroes = this.herosJson
      .allHeros()
      .filter((hero) => hero.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    this.herosJson.Hero.set(filteredHeroes);
    return filteredHeroes;
  }

  filterHero(searchTerm: string) {
    this.transform(this.herosJson.Hero(), searchTerm);
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

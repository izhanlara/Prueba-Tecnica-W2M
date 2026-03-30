import { inject, Pipe, PipeTransform, Injectable } from '@angular/core';
import { ModalEditService } from '../../services/core/modal-services/modal-edit.service';
import { ModalAddService } from '../../services/core/modal-services/modal-add.service';
import { HerosJson } from '../../services/core/heros.service';

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

  // ! Fix () el btn de showMore sale cuando le das a buscar input vacio
  transform(value: string): string {
    const searchTerm = value.trim();
    if (!searchTerm) {
      this.herosJson._hero.set(this.herosJson._allHeros());
    }
    const filteredHeroes = this.herosJson
      ._allHeros()
      .filter((hero) =>
        hero.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    this.herosJson._hero.set(filteredHeroes);
    return value;
  }

  filterHero(searchTerm: string) {
    return this.transform(searchTerm);
  }

  openAddHeroModal() {
    this.modalAddService.openAddHeroModal();
  }
}

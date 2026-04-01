import { inject, Pipe, PipeTransform, Injectable } from '@angular/core';
import { ModalEditService } from '@services/core/modal-services/modal-edit.service';
import { ModalAddService } from '@services/core/modal-services/modal-add.service';
import { HerosJson } from '@services/core/heros.service';

@Pipe({
  name: 'filterHero',
})
@Injectable({
  providedIn: 'root',
})
export class FilterHeroPipe implements PipeTransform {
  readonly modalEditService = inject(ModalEditService);
  readonly modalAddService = inject(ModalAddService);
  readonly heroService = inject(HerosJson);

  // ! Fix () el btn de showMore sale cuando le das a buscar input vacio
  transform(value: string) {
    const searchTerm = value.trim();
    if (!searchTerm) {
      this.heroService._hero.set(this.heroService._allHeros());
    }
    this.heroService.getHeros().subscribe((heroes) => {
      return heroes.filter((hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
  }

  filterHero(searchTerm: string) {
    return this.transform(searchTerm);
  }

  openAddHeroModal() {
    this.modalAddService.openAddHeroModal();
  }
}

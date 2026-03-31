import { inject, Injectable, signal } from '@angular/core';
import { HerosJson } from '@services/core/heros.service';
import { PopupModalEditComponent } from '../../../popup-component/popup-modal-component/popup-modal-component/popup-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteService {
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly isOpen = signal(false);
  public readonly message = signal<string>('Heroe Eliminado con éxito');
  public readonly popUpComponent = inject(PopupModalEditComponent);
  public readonly snackBar = inject(MatSnackBar);
  private readonly herosJson = inject(HerosJson);

  // TODO () revisar tipado
  public confirmDelete(id: number | string | undefined) {
    const index = this.selectedHeroIndex();
    if (index) {
      const heroToDelete = this.herosJson._hero()[index];
      this.herosJson.deleteHero(heroToDelete.id).subscribe(() => {
        const updatedAllHeroes = this.herosJson
          ._allHeros()
          .filter((hero) => hero.id !== heroToDelete.id);
        this.herosJson._allHeros.set(updatedAllHeroes);
        this.herosJson._hero.set(updatedAllHeroes.slice(0, 12));
      });
    }
    this.closeModalDelete();
  }

  public closeModalDelete() {
    this.isOpen.set(false);
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { HerosJson } from '@services/core/heros.service';
import { PopupModalEditComponent } from '../popup-modal.service';
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
  private readonly serviceHeros = inject(HerosJson);

  // TODO () revisar tipado
  public confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index) {
      const heroToDelete = this.serviceHeros._hero()[index];
      this.serviceHeros.deleteHero(heroToDelete.id).subscribe(() => {
        const updatedAllHeroes = this.serviceHeros
          ._allHeros()
          .filter((hero) => hero.id !== heroToDelete.id);
        this.serviceHeros._allHeros.set(updatedAllHeroes);
        this.serviceHeros._hero.set(updatedAllHeroes.slice(0, 12));
      });
    }
    this.closeModalDelete();
  }

  public closeModalDelete() {
    this.isOpen.set(false);
  }
}

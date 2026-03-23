import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HerosJson } from '../../../services/core/heros.service';

@Injectable({
  providedIn: 'root',
})
export class ModalDeleteService {
  http = inject(HttpClient);
  private readonly herosJson = inject(HerosJson);
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly isOpen = signal(false);

  confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index !== null) {
      const heroToDelete = this.herosJson.Hero()[index];

      if (!heroToDelete.id) {
        return;
      }

      this.http.delete(`http://localhost:3000/allHeros/${heroToDelete.id}`).subscribe(() => {
        const updatedAllHeroes = this.herosJson
          .allHeros()
          .filter((hero) => hero.id !== heroToDelete.id);
        this.herosJson.allHeros.set(updatedAllHeroes);

        this.herosJson.Hero.set(updatedAllHeroes.slice(0, 12));
      });
    }
    this.closeModalDelete();
  }

  closeModalDelete() {
    this.isOpen.set(false);
  }
}

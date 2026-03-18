import { Component, inject, signal } from '@angular/core';

import { HerosJson } from '../../services/core/heros.service';

@Component({
  selector: 'app-delete-btn',
  template: `
    @if (isOpen()) {
      <div class="modal-overlay">
        <h2>¿Estás seguro de que quieres eliminar este héroe?</h2>
        <button (click)="confirmDelete()">Sí, eliminar</button>
        <button (click)="closeModalDelete()">Cancelar</button>
      </div>
    }
  `,
  styleUrls: ['./modal-styles.scss'],
})
export class ModalDeleteHeroComponent {
  private readonly herosJson = inject(HerosJson);
  public readonly selectedHeroIndex = signal<number | null>(null);
  public readonly isOpen = signal(false);

  openModalDelete() {
    this.isOpen.set(true);
  }

  closeModalDelete() {
    this.isOpen.set(false);
  }

  confirmDelete() {
    const index = this.selectedHeroIndex();
    if (index !== null) {
      const currentHeroes = this.herosJson.Hero();
      const updatedHeroes = currentHeroes.filter((_, i) => i !== index);
      this.herosJson.Hero.set(updatedHeroes);
    }
    this.closeModalDelete();
  }
}

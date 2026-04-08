import { Injectable, inject } from '@angular/core';
import { Hero } from '../heroes.model';
import { HerosJson } from '@core/heros.service';
import { CoreModalServices } from '@core/modal-services/core-modal.service';

@Injectable({
  providedIn: 'root',
})
export class ModalAddService {
  public readonly coreServices = inject(CoreModalServices);
  private readonly herosService = inject(HerosJson);

  public openAddHeroModal() {
    this.coreServices.openModal('add');
  }

  public onSubmit() {
    if (this.coreServices.formControl.valid) {
      const newHero: Hero = {
        id: Math.floor(Math.random() * 1000),
        title: this.coreServices.formControl.get('title')?.value ?? '',
        subTitle: this.coreServices.formControl.get('subTitle')?.value ?? '',
        location: this.coreServices.formControl.get('location')?.value ?? '',
        description:
          this.coreServices.formControl.get('description')?.value ?? '',
        img:
          this.coreServices.formControl.get('img')?.value ??
          'img/default-image-url.png',
      };
      this.herosService.addHero(newHero).subscribe(() => {
        this.closeModalAdd();
      });
    }
  }

  public closeModalAdd() {
    this.coreServices.closeModal();
    this.coreServices.formControl.reset();
  }
}

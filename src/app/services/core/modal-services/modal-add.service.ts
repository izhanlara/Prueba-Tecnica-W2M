import { Injectable, inject } from '@angular/core';
import { Hero } from '../heroes.model';
import { HerosJson } from '@core/heros.service';
import { CoreModalServices } from '@services/core/modal-services/coreModal.service';

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
      const formValue = this.coreServices.formControl.getRawValue();
      const newHero: Hero = {
        id: Math.floor(Math.random() * 1000),
        title: formValue.title,
        subTitle: formValue.subTitle,
        location: formValue.location,
        description: formValue.description,
        img: formValue.img || 'img/default-image-url.png',
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

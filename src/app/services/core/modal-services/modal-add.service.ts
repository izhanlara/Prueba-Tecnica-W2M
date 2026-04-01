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
        name: formValue.name,
        powers: formValue.powers,
        location: formValue.location,
        description: formValue.description,
        img: formValue.img || 'img/default-image-url.png',
      };
      this.herosService.addHero(newHero).subscribe(() => {
        this.closeModalAdd();
      });
    }
  }

  public onFileChange(event: Event) {
    this.coreServices.formControl.controls.img.setValue(
      '/img/default-hero.png',
    );
    const input = event.target as HTMLInputElement;
    if (!input?.files?.[0]) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.coreServices.formControl.controls.img.setValue(
        reader.result as string,
      );
    };
    reader.readAsDataURL(file);
  }

  public closeModalAdd() {
    this.coreServices.closeModal();
    this.coreServices.formControl.reset();
  }
}

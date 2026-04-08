import { FormControl, FormGroup } from '@angular/forms';

export type HeroFormControls = {
  title: FormControl<string>;
  subTitle: FormControl<string>;
  location: FormControl<string>;
  description: FormControl<string>;
  img: FormControl<string>;
};

export type HeroFormGroup = FormGroup<HeroFormControls>;

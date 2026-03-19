import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../.././../services/core/loader/loader';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}

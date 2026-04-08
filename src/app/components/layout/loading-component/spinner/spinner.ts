import { Component } from '@angular/core';
import { LoaderService } from '@services/core/loader/loader';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.scss'],
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}

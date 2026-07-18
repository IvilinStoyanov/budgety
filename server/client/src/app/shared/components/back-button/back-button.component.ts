import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class BackButtonComponent {
  @Input() path: string;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from 'src/app/shared/models/interface/User';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class BudgetOverviewComponent {
  @Input() user: IUser;
  @Input() displayMode: 'both' | 'summary' | 'details' = 'both';
}

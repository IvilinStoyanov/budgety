import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/shared/models/interface/User';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.css']
})
export class BudgetOverviewComponent {
  @Input() user: IUser;
}

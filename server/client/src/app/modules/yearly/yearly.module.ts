import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { YearlyListComponent } from './components/yearly-list/yearly-list.component';
import { YearlyRoutingModule } from './yearly-routing.module';

@NgModule({
  declarations: [YearlyListComponent],
  imports: [CommonModule, SharedModule, YearlyRoutingModule]
})
export class YearlyModule {}

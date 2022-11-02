import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { YearlyRoutingModule } from './yearly-routing.module';

import { YearlyListComponent } from './components/yearly-list/yearly-list.component';


@NgModule({
  declarations: [
    YearlyListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    YearlyRoutingModule
  ]
})
export class YearlyModule { }

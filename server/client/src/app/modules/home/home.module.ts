import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/home/landing.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}

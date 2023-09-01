import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ColorsRoutingModule } from './colors-routing.module';
import { AddColorComponent } from './components/add-color/add-color.component';

@NgModule({
  declarations: [AddColorComponent],
  imports: [CommonModule, SharedModule, ColorsRoutingModule]
})
export class ColorsModule {}

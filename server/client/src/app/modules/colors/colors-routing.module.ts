import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddColorComponent } from './components/add-color/add-color.component';

const routes: Routes = [{ path: '', component: AddColorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule { }

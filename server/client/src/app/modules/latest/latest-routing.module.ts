import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { LatestListComponent } from './components/latest-list/latest-list.component';

const routes: Routes = [
  {
    path: '', component: LatestListComponent,

    children: [{
      path: 'category', component: CategoryDetailComponent
    }],
  },
  {
    path: 'category', component: CategoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestRoutingModule { }

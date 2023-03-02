import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/activities'
  },
  {
    path: 'activities',
    component: ActivitiesComponent
  },
  {
    path: 'activities/new',
    component: ActivityEditComponent
  },
  {
    path: 'activities/:id',
    component: ActivityDetailComponent
  },
  {
    path: 'activities/:id/edit',
    component: ActivityEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

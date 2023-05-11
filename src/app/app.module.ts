import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RepeatingActivityService } from 'src/services/repeating-activity.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityInstanceComponent } from './activity-instance/activity-instance.component';
import { ActivityComponent } from './activity/activity.component';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivitiesComponent,
    ActivityEditComponent,
    ActivityInstanceComponent,
    ActivityComponent,
    TagsListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [RepeatingActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityEditComponent } from './activities/activity-edit/activity-edit.component';
import { ActivityInstanceComponent } from './activities/activity-instance/activity-instance.component';
import { ActivityComponent } from './activities/activity/activity.component';

import { TagsListComponent } from './tags/tags-list/tags-list.component';
import { TagComponent } from './tags/tag/tag.component';

import { RepeatingActivityService } from './activities/repeating-activity.service';

import * as fromApp from './store/app.reducer';
import { environment } from '../environments/environment'; 

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivitiesComponent,
    ActivityEditComponent,
    ActivityInstanceComponent,
    ActivityComponent,
    TagsListComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    NgbModule
  ],
  providers: [RepeatingActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

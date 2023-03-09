import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RepeatingActivityService } from 'src/services/repeating-activity.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivitiesComponent } from './activities/activities.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivityComponent,
    ActivitiesComponent,
    DropdownDirective,
    HeaderComponent,
    ActivityEditComponent
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

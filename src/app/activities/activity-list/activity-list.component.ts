import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { RepeatingActivity } from '../repeating-activity.model';
import { RepeatingActivityService } from '../repeating-activity.service';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit, OnDestroy {
  activities: RepeatingActivity[] = [];
  activitiesSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private activityService: RepeatingActivityService
  ) { }

  ngOnInit(): void {
    this.activitiesSubscription =
      this.store.select('activityList').
        pipe(map(activityState => activityState.repeating_activities)).
        subscribe((repeatingActivities: RepeatingActivity[]) => {
          this.activities = repeatingActivities;
        });

        // this.activities = this.activityService.getActivities();
        // this.activitiesSubscription =
        //   this.activityService.activitiesChanged.subscribe(
        //     () => {
        //       this.activities = this.activityService.getActivities();
        //     }
        //   );

    //
    // Populate some instances
    //
    // if (false) {
    //   this.activities.forEach((activity: RepeatingActivity) => {
    //     this.activityService.newInstance(activity).complete();
    //     this.activityService.newInstance(activity).complete();
    //   });
    //   } 
  }

  ngOnDestroy(): void {
    if (this.activitiesSubscription) {
      this.activitiesSubscription.unsubscribe();
    }
  }
}

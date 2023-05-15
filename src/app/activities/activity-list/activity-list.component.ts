import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RepeatingActivity } from 'src/app/activities/repeating-activity.model';
import { RepeatingActivityService } from 'src/app/activities/repeating-activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit, OnDestroy {
  activities: RepeatingActivity[] = [];
  activitiesChangedSubscription: Subscription;

  constructor(private activityService: RepeatingActivityService) { }

  ngOnInit(): void {
    this.activities = this.activityService.getActivities();

    this.activitiesChangedSubscription =
      this.activityService.activitiesChanged.subscribe(
        () => {
          this.activities = this.activityService.getActivities();
        }
      );

    //
    // Populate some instances
    //
    if (false) {
      this.activities.forEach((activity: RepeatingActivity) => {
        this.activityService.newInstance(activity).complete();
        this.activityService.newInstance(activity).complete();
      });
      } 
  }

  ngOnDestroy(): void {
    this.activitiesChangedSubscription.unsubscribe();
  }
}

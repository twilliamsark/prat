import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepeatingActivity } from 'src/models/repeating-activity.model';
import { RepeatingActivityService } from 'src/services/repeating-activity.service';

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
    this.activities = this.activityService.activities;
    console.log(this.activities);
    this.activitiesChangedSubscription =
      this.activityService.activitiesChanged.subscribe(
        () => {
          this.activities = this.activityService.activities;
        }
      );

    //
    // Populate some instances
    // 
    // this.activities.forEach((activity: RepeatingActivity) => {
    //   const instance = this.activityService.newInstance(activity);
    //   instance.complete();
    //
    //   this.activityService.newInstance(activity);  
    // });
    //    
    // const lastActivity = this.activities[this.activities.length - 1];
    // const lastOne = this.activityService.newInstance(lastActivity);
    // lastOne.complete();
  }

  onRecordInstance(activity: RepeatingActivity) {
    this.activityService.newInstance(activity).complete();
  }

  ngOnDestroy(): void {
    this.activitiesChangedSubscription.unsubscribe();
  }
}

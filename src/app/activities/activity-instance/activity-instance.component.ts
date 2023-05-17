import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { RepeatingActivityInstance } from '../repeating-activity-instance.model';
import { RepeatingActivity } from '../repeating-activity.model';

import * as fromApp from '../../store/app.reducer';
import * as ActivityActions from '../store/activity.actions';
import * as fromActivity from '../store/activity.reducer';

import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';


@Component({
  selector: 'app-activity-instance',
  templateUrl: './activity-instance.component.html',
  styleUrls: ['./activity-instance.component.css']
})
export class ActivityInstanceComponent implements OnInit, OnDestroy {
  @Input() instance: RepeatingActivityInstance;
  @Input() index: number = 0;

  // This is ugly
  @Input() accordian: NgbAccordion;
  @Input() activityIndex: number = 0;

  private repeatingActivity: RepeatingActivity;
  activitySubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.activitySubscription =
      this.store.select('activityList').
        pipe(
          map((activityState: fromActivity.ActivityState) => {
            return activityState.repeating_activities.find((_activity_, index) => {
              return this.activityIndex === index;
            });
          })
        ).subscribe((repeatingActivity: RepeatingActivity) => {
          this.repeatingActivity = repeatingActivity;
        });
  }

  ngOnDestroy(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

  onDelete() {
    this.store.dispatch(new ActivityActions.DeleteActivityInstance({
      instanceIndex: this.index,
      activityIndex: this.activityIndex
    }));
    // this.activityService.removeInstance(this.index, this.repeatingActivity());
    if (this.repeatingActivity.isEmpty()) {
      this.accordian.collapse('activity-'+this.activityIndex);
    }
  }
}

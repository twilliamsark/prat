import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RepeatingActivity } from '../repeating-activity.model';
import { RepeatingActivityService } from '../repeating-activity.service';
import { Tag } from '../../tags/tag.model';

import * as fromApp from '../../store/app.reducer';
import * as ActivityActions from '../store/activity.actions';

import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { ActivityState } from '../store/activity.reducer';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit, OnDestroy {
  activityEditForm: FormGroup;
  editMode: boolean = false;
  id: number;
  selectedActivity: RepeatingActivity;

  public tags: Tag[] = [];

  private activitySubscription: Subscription;

  constructor(private activityService: RepeatingActivityService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let activityId = +params['id'];
        this.id = Number.isNaN(activityId) ? null : activityId;
        this.editMode = this.id != null ? true : false;

        if(this.editMode) {
          this.activitySubscription = 
            this.store.select('activityList').
              pipe(
                map((activityState: ActivityState) => {
                  return activityState.repeating_activities.find((_activity_, index) => {
                    return this.id === index;
                  });
                })
              ).subscribe((repeatingActivity: RepeatingActivity) => {
                this.selectedActivity = Object.assign({}, repeatingActivity); // make deep copy so we can update tags
                this.tags = [...repeatingActivity.tags];
              });
        }
      }
    );

    this.activityEditForm = new FormGroup({
      'activity': new FormControl(
        this.selectedActivity ? this.selectedActivity.activity_type : '',
        Validators.required),
      'tag': new FormControl([undefined])
    });
  }

  ngOnDestroy(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

  removeTag(tag) {
    // TODO
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.activityEditForm.controls.tag.value;
    if (inputValue && event.code === 'Comma') {

      this.tags.push(new Tag(this.titleCase(inputValue)));
      this.activityEditForm.controls.tag.setValue('');

    }
  }

  // there has got to be a better way to do this!
  titleCase(tagValue: string): string {
    return tagValue.
      trim().
      replace(',','').
      toLowerCase().
      split(' ').
      map(word => word.charAt(0).toUpperCase() + word.substring(1)).
      join(' ');
  }
 
  onCancel() {
    if (this.activityEditForm.untouched) {
      this.store.dispatch(new ActivityActions.EditActivityStop());
      this.router.navigate(['/']);
    }

    if (this.editMode) {
      this.activityEditForm.reset({
        activity: this.selectedActivity.activity_type
      });
    } else {
      this.activityEditForm.reset({
        activity: ''
      });
    }
  }

  onSave() {
    const activity_type = this.activityEditForm.get('activity').value;

    if(this.editMode) {
      this.selectedActivity.activity_type = activity_type;
      this.selectedActivity.tags = this.tags;
      this.store.dispatch(new ActivityActions.UpdateActivity({ 
        index: this.id, 
        repeatingActivity: this.selectedActivity
      }));
    } else {
      const rs = this.activityService.newActivity(activity_type);
      this.selectedActivity = rs.activity;
      this.selectedActivity.tags = this.tags;
    }

    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RepeatingActivity } from 'src/models/repeating-activity.model';
import { RepeatingActivityService } from 'src/services/repeating-activity.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {
  activityEditForm: FormGroup;
  editMode: boolean = false;
  id: number;
  selectedActivity: RepeatingActivity;


  constructor(private activityService: RepeatingActivityService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let activityId = +params['id'];
        this.id = Number.isNaN(activityId) ? null : activityId;
        this.editMode = this.id != null ? true : false;

        if(this.editMode) {
          this.selectedActivity =
            this.activityService.activities[this.id];
        }
      }
    );

    this.activityEditForm = new FormGroup({
      'activity': new FormControl(
        this.selectedActivity ? this.selectedActivity.activity_type : '',
        Validators.required),
      'day': new FormControl(
        this.selectedActivity ? this.selectedActivity.day : 'Monday', 
        Validators.required)
    });
  }

  onCancel() {
    if (this.activityEditForm.untouched) {
      this.router.navigate(['/']);
    }

    if (this.editMode) {
      this.activityEditForm.reset({
        activity: this.selectedActivity.activity_type,
        day: this.selectedActivity.day
      });
    } else {
      this.activityEditForm.reset({
        activity: '',
        day: 'Monday'
      });
    }
  }

  onSave() {
    console.log(JSON.stringify(this.activityEditForm.value));
    const activity_type = this.activityEditForm.get('activity').value;
    const day_of_week = this.activityEditForm.get('day').value;

    if(this.editMode) {
      this.selectedActivity.activity_type = activity_type;
      this.selectedActivity.day = day_of_week;
      this.activityService.updateActivity(this.id, this.selectedActivity);
    } else {
      this.activityService.newActivity(day_of_week, activity_type);
    }
    this.router.navigate(['/']);
  }

  allowedDays(): string[] {
    return this.activityService.DAYS;
  }
}

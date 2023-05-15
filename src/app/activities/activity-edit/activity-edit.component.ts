import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RepeatingActivity } from 'src/app/activities/repeating-activity.model';
import { RepeatingActivityService } from 'src/app/activities/repeating-activity.service';
import { Tag } from 'src/app/tags/tag.model';


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

  tags: Tag[] = [];

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
            this.activityService.getActivity(this.id);
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

  removeTag(tag) {
    // TODO
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.activityEditForm.controls.tag.value;
    if (inputValue && event.code === 'Comma') {

      const tagValue = inputValue.trim().replace(',','');

      if (this.selectedActivity) {
        this.selectedActivity.addTag(tagValue);
      } else {
        this.tags.push(new Tag(tagValue));
      }
      this.activityEditForm.controls.tag.setValue('');

    }
  }

  onCancel() {
    if (this.activityEditForm.untouched) {
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
      this.activityService.updateActivity(this.id, this.selectedActivity);
    } else {
      const rs = this.activityService.newActivity(activity_type);
      this.selectedActivity = rs.activity;
      this.selectedActivity.tags = this.tags;
    }

    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RepeatingActivity } from 'src/models/repeating-activity.model';
import { RepeatingActivityService } from 'src/services/repeating-activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  selectedActivity: RepeatingActivity;

  constructor(private activityService: RepeatingActivityService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedActivity =
          this.activityService.activities[+params['id']];
      }
    );
  }

  onRecordActivity() {
    this.activityService.newInstance(this.selectedActivity).complete();
  }
}

import { Component, Input } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { RepeatingActivity } from 'src/models/repeating-activity.model';
import { RepeatingActivityService } from 'src/services/repeating-activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() currentActivity: RepeatingActivity;
  @Input() activityIndex: number;
  @Input() accordian: NgbAccordion;

  constructor(private activityService: RepeatingActivityService) { }

  onRecordInstance() {
    this.activityService.newInstance(this.currentActivity).complete();
    this.onShowInstances();
  }

  onShowInstances() {
    this.accordian.expand('activity-'+this.activityIndex);
  }
}

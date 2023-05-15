import { Component, Input } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { RepeatingActivity } from 'src/app/activities/repeating-activity.model';
import { RepeatingActivityService } from 'src/app/activities/repeating-activity.service';

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

    let panelName = this.panelId();
    if (!this.accordian.isExpanded(panelName)) {
      this.accordian.expand(panelName);
    }
  }

  onShowInstances() {
    let panelName = this.panelId();

    if (this.accordian.activeIds[0] === panelName) {
      this.accordian.collapse(panelName);
    } else {
      this.accordian.expand(panelName);
    }
  }

  panelId(): string {
    return 'activity-'+this.activityIndex;
  }
}

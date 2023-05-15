import { Component, Input } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { RepeatingActivityInstance } from '../repeating-activity-instance.model';
import { RepeatingActivity } from '../repeating-activity.model';
import { RepeatingActivityService } from '../repeating-activity.service';

@Component({
  selector: 'app-activity-instance',
  templateUrl: './activity-instance.component.html',
  styleUrls: ['./activity-instance.component.css']
})
export class ActivityInstanceComponent {
  @Input() instance: RepeatingActivityInstance;
  @Input() index: number = 0;

  // This is ugly
  @Input() accordian: NgbAccordion;
  @Input() activityIndex: number = 0;

  constructor(private activityService: RepeatingActivityService) {}

  repeatingActivity(): RepeatingActivity {
    return this.instance.getActivity();
  }

  onDelete() {
    this.activityService.removeInstance(this.index, this.repeatingActivity());
    if (this.repeatingActivity().isEmpty()) {
      this.accordian.collapse('activity-'+this.activityIndex);
    }
  }
}

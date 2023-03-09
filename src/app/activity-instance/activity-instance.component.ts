import { Component, Input } from '@angular/core';
import { RepeatingActivityInstance } from 'src/models/repeating-activity-instance.model';
import { RepeatingActivity } from 'src/models/repeating-activity.model';
import { RepeatingActivityService } from 'src/services/repeating-activity.service';

@Component({
  selector: 'app-activity-instance',
  templateUrl: './activity-instance.component.html',
  styleUrls: ['./activity-instance.component.css']
})
export class ActivityInstanceComponent {
  @Input() instance: RepeatingActivityInstance;
  @Input() index: number = 0;

  constructor(private activityService: RepeatingActivityService) {}

  repeatingActivity(): RepeatingActivity {
    return this.instance.getActivity();
  }

  onDelete() {
    this.activityService.removeInstance(this.index, this.repeatingActivity());
  }
}

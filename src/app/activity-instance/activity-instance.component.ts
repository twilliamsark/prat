import { Component, Input } from '@angular/core';
import { RepeatingActivityInstance } from 'src/models/repeating-activity-instance.model';

@Component({
  selector: 'app-activity-instance',
  templateUrl: './activity-instance.component.html',
  styleUrls: ['./activity-instance.component.css']
})
export class ActivityInstanceComponent {
  @Input() instance: RepeatingActivityInstance;
  @Input() index: number = 0;
}

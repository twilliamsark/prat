import { Component, Input, OnInit } from '@angular/core';
import { RepeatingActivity } from 'src/models/repeating-activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activity: RepeatingActivity;
  @Input() index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}

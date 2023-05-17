import { Component, Input } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { RepeatingActivity } from '../repeating-activity.model';
import { RepeatingActivityService } from '../repeating-activity.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as ActivityActions from '../store/activity.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() currentActivity: RepeatingActivity;
  @Input() activityIndex: number;
  @Input() accordian: NgbAccordion;

  constructor(
    private activityService: RepeatingActivityService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

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

  onEdit() {
    this.store.dispatch(new ActivityActions.EditActivityStart(this.activityIndex));
    this.router.navigate([this.activityIndex, 'edit'], { relativeTo: this.route });
  }

  panelId(): string {
    return 'activity-'+this.activityIndex;
  }
}

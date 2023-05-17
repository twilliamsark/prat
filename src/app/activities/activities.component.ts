import { Component } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as ActivityActions from './store/activity.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  onNew() {
    this.store.dispatch(new ActivityActions.NewActivityStart());
    this.router.navigate(['activities/new']);
  }
}

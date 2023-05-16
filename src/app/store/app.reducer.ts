import { ActionReducerMap } from "@ngrx/store";
import * as fromActivities from "../activities/store/activity.reducer"

export interface AppState {
  activityList: fromActivities.ActivityState;
}

export const appReducer: ActionReducerMap<AppState> = {
  activityList: fromActivities.activityReducer
}
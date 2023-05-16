import { Action } from "@ngrx/store";
import { RepeatingActivity } from "../repeating-activity.model";

export const ADD_NEW_ACTIVITY = "[Activity] Add New Activity";

export class AddNewActivity implements Action {
  readonly type: string = ADD_NEW_ACTIVITY;

  constructor(public activity: RepeatingActivity) {}
}

export type ActivityActions =
  | AddNewActivity;
import { Action } from "@ngrx/store";
import { RepeatingActivity } from "../repeating-activity.model";
import { Tag } from "../../tags/tag.model";

export const ADD_NEW_ACTIVITY = "[Activity] Add New Activity";
export const EDIT_ACTIVITY_START = "[Activity] Edit Activity Start";
export const EDIT_ACTIVITY_STOP = "[Activity] Edit Activity Stop";
export const UPDATE_ACTIVITY = "[Activity] Update Activity";

export class AddNewActivity implements Action {
  readonly type: string = ADD_NEW_ACTIVITY;
  constructor(public payload: RepeatingActivity) {}
}

export class EditActivityStart implements Action {
  readonly type: string = EDIT_ACTIVITY_START;
  constructor(public payload: number) {}
}

export class EditActivityStop implements Action {
  readonly type: string = EDIT_ACTIVITY_STOP;
}

export class UpdateActivity implements Action {
  readonly type: string = UPDATE_ACTIVITY;
  constructor(public payload: { 
    index: number, 
    repeatingActivity: RepeatingActivity
  }) {}
}

export type ActivityActions =
  | AddNewActivity
  | EditActivityStart
  | EditActivityStop
  | UpdateActivity;
import { Action } from "@ngrx/store";
import { RepeatingActivity } from "../repeating-activity.model";
import { RepeatingActivityInstance } from "../repeating-activity-instance.model";

export const ADD_ACTIVITY_INSTANCE = "[Activity] Add Instance";
export const ADD_NEW_ACTIVITY = "[Activity] Add New Activity";
export const DELETE_ACTIVITY_INSTANCE = "[Activity] Delete Instance";
export const EDIT_ACTIVITY_START = "[Activity] Edit Activity Start";
export const EDIT_ACTIVITY_STOP = "[Activity] Edit Activity Stop";
export const NEW_ACTIVITY_START = "[Activity] New Activity Start";
export const NEW_ACTIVITY_STOP = "[Activity] New Activity Stop";
export const UPDATE_ACTIVITY = "[Activity] Update Activity";

export class AddActivityInstance implements Action {
  readonly type: string = ADD_ACTIVITY_INSTANCE;
  constructor(public payload: number) {}
}

export class AddNewActivity implements Action {
  readonly type: string = ADD_NEW_ACTIVITY;
  constructor(public payload: RepeatingActivity) {}
}

export class EditActivityStart implements Action {
  readonly type: string = EDIT_ACTIVITY_START;
  constructor(public payload: number) {}
}

export class DeleteActivityInstance implements Action {
  readonly type: string = DELETE_ACTIVITY_INSTANCE;
  constructor(public payload: {
    instanceIndex: number, 
    activityIndex: number
  }) {}
}

export class EditActivityStop implements Action {
  readonly type: string = EDIT_ACTIVITY_STOP;
}

export class NewActivityStart implements Action {
  readonly type: string = NEW_ACTIVITY_START;
}

export class NewActivityStop implements Action {
  readonly type: string = NEW_ACTIVITY_STOP;
}

export class UpdateActivity implements Action {
  readonly type: string = UPDATE_ACTIVITY;
  constructor(public payload: { 
    index: number, 
    repeatingActivity: RepeatingActivity
  }) {}
}

export type ActivityActions =
  | AddActivityInstance
  | AddNewActivity
  | DeleteActivityInstance
  | EditActivityStart
  | EditActivityStop
  | NewActivityStart
  | NewActivityStop
  | UpdateActivity;
import { Tag } from "../../tags/tag.model";
import { RepeatingActivityInstance } from "../repeating-activity-instance.model";
import { RepeatingActivity } from "../repeating-activity.model";
import * as ActivityActions from "./activity.actions";
import { environment } from "../../../environments/environment";

const initialRepeatingActivities: RepeatingActivity[] =
  environment.production ? [] : [
    new RepeatingActivity('Walking', [
    new Tag('Low Impact'),
    new Tag('Relaxing'),
    new Tag('Outside'),
    new Tag('Inside'),
    new Tag('Audio Book')
  ]),
  new RepeatingActivity('PT', [
    new Tag('Cardio'),
    new Tag('Inside')
  ]),
  new RepeatingActivity('Reading'),
  new RepeatingActivity('Napping')
];

function repeatingActivitySortedTagPool(repeatingActivities: RepeatingActivity[]) : Tag[] {
  const combinedTagPool: Tag[] = 
    repeatingActivities.flatMap((val: RepeatingActivity) => { 
      return val.tags; 
    });
  
  return [
    ...new Map(
      combinedTagPool.map((tag: Tag) => [tag.name, tag])
    ).values()
  ].sort((a, b) => { 
    return String(a.name).localeCompare(b.name);
  });
}

export interface ActivityState {
  repeating_activities: RepeatingActivity[];
  tag_pool: Tag[];
  edit_activity: boolean;
}

const initialState: ActivityState = {
  repeating_activities: initialRepeatingActivities,
  tag_pool: repeatingActivitySortedTagPool(initialRepeatingActivities),
  edit_activity: false
}

export function activityReducer(
  state: ActivityState = initialState,
  action: ActivityActions.ActivityActions
) {
  switch(action.type) {
    case ActivityActions.ADD_ACTIVITY_INSTANCE:
      const addInstance: ActivityActions.AddActivityInstance =
        (action as ActivityActions.AddActivityInstance);

      const addInstanceState: ActivityState = {
        ...state,
        repeating_activities: [...state.repeating_activities]
      }

      let addToMe = addInstanceState.repeating_activities[addInstance.payload] =
        Object.assign(new RepeatingActivity, addInstanceState.repeating_activities[addInstance.payload]);
      addToMe.addInstance(true);

      return addInstanceState;

    case ActivityActions.ADD_NEW_ACTIVITY:
      const newAction: ActivityActions.AddNewActivity =
        (action as ActivityActions.AddNewActivity);

      return {
        ...state,
        repeating_activities: [...state.repeating_activities, newAction.payload],
        edit_activity: false
      };

    case ActivityActions.DELETE_ACTIVITY_INSTANCE:
      const deleteInstance: ActivityActions.DeleteActivityInstance =
        (action as ActivityActions.DeleteActivityInstance);

      const deleteInstanceState: ActivityState = {
        ...state,
        repeating_activities: [...state.repeating_activities]
      };

      let removeFromMe = 
        deleteInstanceState.repeating_activities[deleteInstance.payload.activityIndex] =
          Object.assign(new RepeatingActivity, deleteInstanceState.repeating_activities[deleteInstance.payload.activityIndex]);

      removeFromMe.removeInstance(deleteInstance.payload.instanceIndex);

      return deleteInstanceState;

    case ActivityActions.EDIT_ACTIVITY_START:
      return {
        ...state,
        edit_activity: true
      };

    case ActivityActions.EDIT_ACTIVITY_STOP:
      return {
        ...state,
        edit_activity: false
      };

    case ActivityActions.NEW_ACTIVITY_START:
    case ActivityActions.NEW_ACTIVITY_STOP:
      return {
        ...state,
        edit_activity: false
      };
 
    case ActivityActions.UPDATE_ACTIVITY:
      const updateAction: ActivityActions.UpdateActivity =
        (action as ActivityActions.UpdateActivity);

      const updateActivityState: ActivityState = {
        ...state,
        repeating_activities: [...state.repeating_activities],
        tag_pool: [...state.tag_pool]
      };

      updateActivityState.repeating_activities[updateAction.payload.index] =
        updateAction.payload.repeatingActivity;

      updateActivityState.tag_pool = 
        repeatingActivitySortedTagPool(updateActivityState.repeating_activities);

      return updateActivityState;

    default:
      return state;
  }
}
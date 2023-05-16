import { Tag } from "../../tags/tag.model";
import { RepeatingActivityInstance } from "../repeating-activity-instance.model";
import { RepeatingActivity } from "../repeating-activity.model";
import * as ActivityActions from "./activity.actions";

export interface ActivityState {
  repeating_activities: RepeatingActivity[];
  repeating_activities_instances: RepeatingActivityInstance[];
  tag_pool: Tag[];
}

const initialRepeatingActivities: RepeatingActivity[] = [
  new RepeatingActivity('Walking', [
    new Tag('LowImpact'),
    new Tag('Relaxing'),
    new Tag('Outside'),
    new Tag('Inside'),
    new Tag('AudioBook')
  ]),
  new RepeatingActivity('PT', [
    new Tag('Cardio'),
    new Tag('Inside')
  ]),
  new RepeatingActivity('Reading')
];

const initialTagPool: Tag[] = initialRepeatingActivities.flatMap((val: RepeatingActivity) => val.tags);

const initialState: ActivityState = {
  repeating_activities: initialRepeatingActivities,
  repeating_activities_instances: [],
  tag_pool: initialTagPool
}

export function activityReducer(
  state: ActivityState = initialState,
  action: ActivityActions.ActivityActions
) {
  switch(action.type) {
    default:
      return state;
  }
}
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
  repeating_activities_instances: RepeatingActivityInstance[];
  tag_pool: Tag[];
}

const initialState: ActivityState = {
  repeating_activities: initialRepeatingActivities,
  repeating_activities_instances: [],
  tag_pool: repeatingActivitySortedTagPool(initialRepeatingActivities)
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
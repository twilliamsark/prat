import { Subject } from "rxjs";
import { RepeatingActivityInstance } from "./repeating-activity-instance.model";
import { RepeatingActivity } from "./repeating-activity.model";
import { Tag } from "../tags/tag.model";

export class RepeatingActivityService {
  public activitiesChanged = new Subject<null>();

  private activities: RepeatingActivity[] = [
    new RepeatingActivity("Walking", [
      new Tag('LowImpact'),
      new Tag('Outside'),
      new Tag('Inside'),
      new Tag('AudioBook')
    ]),
    new RepeatingActivity("PT", [
      new Tag('Cardio'),
      new Tag('Inside')
    ]),
    new RepeatingActivity("Reading")
  ];

  newInstance(activity: RepeatingActivity): RepeatingActivityInstance {
    const instance = new RepeatingActivityInstance(activity, activity.instances.length + 1);
    activity.instances.push(instance);
    return instance;
  }

  instances(activity: RepeatingActivity): RepeatingActivityInstance[] {
    return activity.instances;
  }

  removeInstance(index: number, activity: RepeatingActivity) {
    activity.instances.splice(index, 1);
    this.activitiesChanged.next(null);
  }
}
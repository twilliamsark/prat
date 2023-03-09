import { Subject } from "rxjs";
import { RepeatingActivityInstance } from "src/models/repeating-activity-instance.model";
import { RepeatingActivity } from "src/models/repeating-activity.model";

export class RepeatingActivityService {
  public activitiesChanged = new Subject<null>();

  public activities: RepeatingActivity[] = [
    new RepeatingActivity("Walking"),
    new RepeatingActivity("PT")
  ];

  newActivity(activity: string): { activity: RepeatingActivity, index: number } {
    const new_activity = new RepeatingActivity(
      activity
    );
    this.activities.push(new_activity);
    this.activitiesChanged.next(null);
    return {
      activity: new_activity,
      index: this.activities.length
    };
  }
  
  newInstance(activity: RepeatingActivity): RepeatingActivityInstance {
    const instance = new RepeatingActivityInstance(activity, activity.instances.length + 1);
    activity.instances.push(instance);
    return instance;
  }

  instances(activity: RepeatingActivity): RepeatingActivityInstance[] {
    return activity.instances;
  }

  updateActivity(index: number, activity: RepeatingActivity) {
    this.activities[index] = activity;
    this.activitiesChanged.next(null);
  }

  removeInstance(index: number, activity: RepeatingActivity) {
    activity.instances.splice(index, 1);
    this.activitiesChanged.next(null);
  }
}
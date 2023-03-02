import { Subject } from "rxjs";
import { RepeatingActivityInstance } from "src/models/repeating-activity-instance.model";
import { RepeatingActivity } from "src/models/repeating-activity.model";

export class RepeatingActivityService {
  public activitiesChanged = new Subject<null>();

  public activities: RepeatingActivity[] = [
    new RepeatingActivity("Monday", "Walking"),
    new RepeatingActivity("Tuesday", "PT")
  ];

  public DAYS: string[] = [
    'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
  ];

  newActivity(day_of_week: string, activity: string): { activity: RepeatingActivity, index: number } {
    const new_activity = new RepeatingActivity(
      day_of_week, activity
    );
    this.activities.push(new_activity);
    this.activitiesChanged.next(null);
    return {
      activity: new_activity,
      index: this.activities.length
    };
  }
  
  newInstance(activity: RepeatingActivity): RepeatingActivityInstance {
    const instance = new RepeatingActivityInstance(activity);
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
}
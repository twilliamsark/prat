import { Subject } from "rxjs";
import { RepeatingActivityInstance } from "src/app/activities/repeating-activity-instance.model";
import { RepeatingActivity } from "src/app/activities/repeating-activity.model";
import { Tag } from "src/app/tags/tag.model";

export class RepeatingActivityService {
  public activitiesChanged = new Subject<null>();

  private activities: RepeatingActivity[] = [
    new RepeatingActivity("Walking", [
      new Tag('LowImpact'),
      new Tag('Relaxing'),
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

  getActivities() : RepeatingActivity[] {
    return this.activities.slice();
  }

  getActivity(index: number) : RepeatingActivity {
    return this.activities[index];
  }

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
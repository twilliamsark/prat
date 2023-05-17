import { formatDate } from "@angular/common";
import { RepeatingActivity } from "./repeating-activity.model";
import { Tag } from "../tags/tag.model";

export class RepeatingActivityInstance {
  private activity: RepeatingActivity;
  private completedOn: number;

  constructor(activity: RepeatingActivity, complete: boolean = false) {
    this.activity = activity;
    if (complete) {
      this.complete();
    }
  }

  getTags(): Tag[] {
    return this.activity.tags.slice();
  }

  getActivity(): RepeatingActivity {
    return this.activity;
  }

  completed(): string {
    if (this.completedOn) {
      return formatDate(this.completedOn, 'short', 'en-US');
    } else {
      return "Incomplete";
    }
  }

  isDone(): boolean {
    if (this.completedOn) {
      return true;
    } else {
      return false;
    }
  }

  complete() {
    this.completedOn = Date.now();
  }

  unComplete() {
    this.completedOn = null;
  }
}
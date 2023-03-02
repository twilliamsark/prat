import { formatDate } from "@angular/common";
import { RepeatingActivity } from "./repeating-activity.model";

export class RepeatingActivityInstance {
  private activity: RepeatingActivity;
  private completedOn: number;

  constructor(activity: RepeatingActivity) {
    this.activity = activity;
  }

  getActivity(): RepeatingActivity {
    return this.activity;
  }

  completed(): string {
    if (this.completedOn) {
      return formatDate(this.completedOn, 'medium', 'en-US');
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
import { formatDate } from "@angular/common";
import { RepeatingActivity } from "./repeating-activity.model";
import { Tag } from "../tags/tag.model";

export class RepeatingActivityInstance {
  private activity: RepeatingActivity;
  private completedOn: number;
  private labelNumber: number = null;

  constructor(activity: RepeatingActivity, label: number = null) {
    this.activity = activity;
    if (label) {
      this.labelNumber = label;
    }
  }

  getLabel() {
    if (this.labelNumber) {
      return "(" + this.labelNumber + ") ";
    } else {
      return ""
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
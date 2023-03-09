import { RepeatingActivityInstance } from "./repeating-activity-instance.model";

export class RepeatingActivity {
  public instances: RepeatingActivityInstance[] = [];

  constructor(public activity_type: string = "Walking") {}

  isEmpty(): boolean {
    return this.instances.length == 0 ? true : false;
  }
}
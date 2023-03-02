import { RepeatingActivityInstance } from "./repeating-activity-instance.model";

export class RepeatingActivity {
  public instances: RepeatingActivityInstance[] = [];

  constructor(public day: string = "Monday", 
              public activity_type: string = "Walking") {}
}
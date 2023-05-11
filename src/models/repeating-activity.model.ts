import { RepeatingActivityInstance } from "./repeating-activity-instance.model";
import { Tag } from "./tag.model";

export class RepeatingActivity {
  public instances: RepeatingActivityInstance[] = [];
  public tags: Tag[] = []

  constructor(
    public activity_type: string = "Walking",
    tags: Tag[] = []
  ) {
    this.tags = tags;
  }

  isEmpty(): boolean {
    return this.instances.length == 0 ? true : false;
  }
}
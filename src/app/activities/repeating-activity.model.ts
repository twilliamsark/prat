import { RepeatingActivityInstance } from "./repeating-activity-instance.model";
import { Tag } from "../tags/tag.model";

export class RepeatingActivity {
  public instances: RepeatingActivityInstance[] = [];
  public tags: Tag[] = []

  constructor(
    public activity_type: string = "Walking",
    tags: Tag[] = []
  ) {
    this.tags = tags;
  }

  addInstance(complete: boolean = false): RepeatingActivityInstance {
    const instance = new RepeatingActivityInstance(this, complete);
    this.instances = [...this.instances, instance];
    return instance;
  }

  removeInstance(index: number): RepeatingActivityInstance {
    const instance = this.instances[index];
    this.instances = this.instances.filter((_instance_, instanceIndex) => {
      return instanceIndex === index ? false : true;
    });
    return instance;
  }

  addTag(name: string) {
    this.tags.push(new Tag(name));
  }

  hasTags(): boolean {
    return this.tags.length > 0;
  }

  isEmpty(): boolean {
    return this.instances.length == 0 ? true : false;
  }
}
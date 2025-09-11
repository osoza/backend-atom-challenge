export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed: boolean = false
  ) {}

  markCompleted() {
    this.completed = true;
  }
}
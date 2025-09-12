import { Timestamp } from "firebase-admin/firestore";

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: Timestamp | string,
    public completed: boolean = false
  ) {}

  markCompleted() {
    this.completed = true;
  }
}
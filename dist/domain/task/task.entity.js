export class Task {
    id;
    title;
    description;
    completed;
    constructor(id, title, description, completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
    markCompleted() {
        this.completed = true;
    }
}

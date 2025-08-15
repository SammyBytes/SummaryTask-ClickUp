import { TaskEntity } from "./TaskEntity";

export class SubTaskEntity extends TaskEntity {
	constructor(task: TaskEntity) {
		super(
			task.id,
			task.name,
			task.description,
			task.priority,
			task.status,
			task.assignees,
			task.subtasks,
			task.dueDate,
		);
	}
}

import type { TaskEntity } from "../entities/TaskEntity";
import { TaskStatusEnum } from "../enum/TaskStatusEnum";

export class TaskDomainService {
	constructor(private task: TaskEntity) {}

	public isOverdue(): boolean {
		return this.task.dueDate.getTime() < Date.now();
	}

	public isCompleted(): boolean {
		return this.task.status === TaskStatusEnum.COMPLETED;
	}

	public isToday(): boolean {
		return this.task.dueDate.toDateString() === new Date().toDateString();
	}
}

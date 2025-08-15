import type { TaskEntity } from "../entities/TaskEntity";
import { TaskStatusEnum } from "../enum/TaskStatusEnum";
import type { ITaskDomainService } from "./interfaces/ITaskDomainService";

export class TaskDomainService implements ITaskDomainService {
	public isOverdue(task: TaskEntity): boolean {
		if (!task.dueDate) return false;
		return task.dueDate?.getTime() < Date.now();
	}

	public isCompleted(task: TaskEntity): boolean {
		return task.status === TaskStatusEnum.COMPLETED;
	}

	public isToday(task: TaskEntity): boolean {
		return task.dueDate?.toDateString() === new Date().toDateString();
	}
}

import type { TaskEntity } from "../../entities/TaskEntity";

export interface ITaskDomainService {
	/**
	 * Returns true if the task is overdue.
	 * @returns True if the task is overdue, false otherwise.
	 */
	isOverdue(task: TaskEntity): boolean;
	isCompleted(task: TaskEntity): boolean;
	isToday(task: TaskEntity): boolean;
}

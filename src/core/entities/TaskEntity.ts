import type { TaskPriorityEnum } from "../enum/TaskPriorityEnum";
import type { TaskStatusEnum } from "../enum/TaskStatusEnum";
import type { SubTaskEntity } from "./SubTaskEntity";
import type { UserEntity } from "./UserEntity";

/**
 * Represents a Task entity
 *
 */
export class TaskEntity {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public priority: TaskPriorityEnum,
		public status: TaskStatusEnum,
		public assignees: UserEntity[] = [],
		public subtasks: SubTaskEntity[] = [],
		public dueDate?: Date,
	) {}
}

import type { TaskEntity } from "../../core/entities/TaskEntity";
/**
 * Repository for Task entities operations
 */
export interface ITaskRepository {
	getAsync(taskId: string, includeSubtasks: boolean): Promise<TaskEntity>;
	getRangeAsync(
		workspaceId: string,
		includeSubtasks: boolean,
		startDate: Date,
		endDate: Date,
	): Promise<TaskEntity[]>;
}

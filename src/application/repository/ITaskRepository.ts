import type { TaskEntity } from "../../core/entities/TaskEntity";

export interface ITaskRepository {
	getAsync(taskId: string): Promise<TaskEntity[]>;
}

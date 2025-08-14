import type { TasksSummaryDto } from "../dtos/TasksSummaryDto";
/**
 * Service for Task entities operations
 */
export interface ITaskSummaryService {
	getTodaySummaryAsync(
		taskId: string,
		includeSubtasks: boolean,
		assignedUser?: string,
	): Promise<TasksSummaryDto>;
}

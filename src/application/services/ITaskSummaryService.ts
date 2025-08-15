import type { TasksSummaryDto } from "../dtos/TasksSummaryDto";
/**
 * Service for Task entities operations
 */
export interface ITaskSummaryService {
	getTodaySummaryAsync(
		taskId: string,
		includeSubtasks: boolean,
	): Promise<TasksSummaryDto>;

	getRangeSummaryAsync(
		workspaceId: string,
		includeSubtasks: boolean,
		startDate: Date,
		endDate: Date,
	): Promise<TasksSummaryDto>;
}

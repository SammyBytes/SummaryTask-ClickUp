import type { TaskSubtaskSummaryDto } from "./TaskSubtaskSummaryDto";

export class TasksSummaryDto {
	constructor(
		public totalSubtasks: number,
		public completedToday: TaskSubtaskSummaryDto[],
		public missedToday: TaskSubtaskSummaryDto[],
	) {}
}

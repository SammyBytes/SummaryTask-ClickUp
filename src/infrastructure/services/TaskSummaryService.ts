import { TasksSummaryDto } from "../../application/dtos/TasksSummaryDto";
import { TaskSubtaskSummaryDto } from "../../application/dtos/TaskSubtaskSummaryDto";
import type { ITaskRepository } from "../../application/repository/ITaskRepository";
import type { ITaskSummaryService } from "../../application/services/ITaskSummaryService";

export class TaskSummaryService implements ITaskSummaryService {
	constructor(private taskRepository: ITaskRepository) {}
	public async getTodaySummaryAsync(
		taskId: string,
		includeSubtasks: boolean = true,
		assignedUser?: string,
	): Promise<TasksSummaryDto> {
		var task = await this.taskRepository.getAsync(taskId, includeSubtasks);

		const today = new Date().toDateString();
		const subtasksForToday = task.subtasks.filter((st) => {
			if (!st.dueDate) return false;
			const isToday = st.dueDate.toDateString() === today;
			if (assignedUser) {
				return isToday && task.assignee.includes(assignedUser);
			}
			return isToday;
		});

		const completedToday = subtasksForToday
			.filter((st) => st.IsCompleted())
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(st.id, st.name, task.assignee, true, true),
			);

		const missedToday = subtasksForToday
			.filter((st) => st.IsTaskDueToday() && !st.completed)
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(st.id, st.name, task.assignee, false, true),
			);

		return new TasksSummaryDto(
			task.subtasks.length,
			completedToday,
			missedToday,
		);
	}
}

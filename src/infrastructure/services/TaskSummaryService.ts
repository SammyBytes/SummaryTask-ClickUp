import { TasksSummaryDto } from "../../application/dtos/TasksSummaryDto";
import { TaskSubtaskSummaryDto } from "../../application/dtos/TaskSubtaskSummaryDto";
import type { ITaskRepository } from "../../application/repository/ITaskRepository";
import type { ITaskSummaryService } from "../../application/services/ITaskSummaryService";
import type { SubTaskEntity } from "../../core/entities/SubTaskEntity";

export class TaskSummaryService implements ITaskSummaryService {
	constructor(private taskRepository: ITaskRepository) {}

	/**
	 * Returns today's summary of subtasks for a given task.
	 * @param taskId ID of the task
	 * @param includeSubtasks Whether to include subtasks (default: true)
	 * @param assignedUser Optional user to filter by assignment
	 * @returns A summary DTO containing completed and missed subtasks for today
	 */
	public async getTodaySummaryAsync(
		taskId: string,
		includeSubtasks: boolean = true,
	): Promise<TasksSummaryDto> {
		const task = await this.taskRepository.getAsync(taskId, includeSubtasks);

		const subtasksForToday = this.getSubtasksForToday(task.subtasks);
		const completedToday = this.getCompletedSubtasks(
			subtasksForToday,
			task.assignee,
		);
		const missedToday = this.getMissedSubtasks(subtasksForToday, task.assignee);

		return new TasksSummaryDto(
			task.subtasks.length,
			completedToday,
			missedToday,
		);
	}

	/**
	 * Filters subtasks that are due today and optionally assigned to a specific user.
	 * @param subtasks Array of subtasks
	 * @param assignedUser Optional user filter
	 * @returns Subtasks that are due today (and optionally assigned to user)
	 */
	private getSubtasksForToday(subtasks: SubTaskEntity[]) {
		const today = new Date().toDateString();
		return subtasks.filter((st) => {
			if (!st.dueDate) return false;

			const isToday = st.dueDate.toDateString() === today;

			return isToday;
		});
	}

	/**
	 * Returns a list of subtasks that are completed today.
	 * @param subtasks Array of subtasks for today
	 * @param taskAssignee Assignee of the parent task
	 * @returns Array of TaskSubtaskSummaryDto for completed subtasks
	 */
	private getCompletedSubtasks(
		subtasks: SubTaskEntity[],
		taskAssignee: string[],
	) {
		return subtasks
			.filter((st) => st.IsCompleted())
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(st.id, st.name, taskAssignee, true, true),
			);
	}

	/**
	 * Returns a list of subtasks that were missed today (due but not completed).
	 * @param subtasks Array of subtasks for today
	 * @param taskAssignee Assignee of the parent task
	 * @returns Array of TaskSubtaskSummaryDto for missed subtasks
	 */
	private getMissedSubtasks(subtasks: SubTaskEntity[], taskAssignee: string[]) {
		return subtasks
			.filter((st) => st.IsTaskDueToday() && !st.completed)
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(st.id, st.name, taskAssignee, false, true),
			);
	}
}

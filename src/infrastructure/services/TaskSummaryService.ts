import { TasksSummaryDto } from "../../application/dtos/TasksSummaryDto";
import { TaskSubtaskSummaryDto } from "../../application/dtos/TaskSubtaskSummaryDto";
import type { ITaskRepository } from "../../application/repository/ITaskRepository";
import type { ITaskSummaryService } from "../../application/services/ITaskSummaryService";
import type { ITaskDomainService } from "../../core/domain/interfaces/ITaskDomainService";
import type { SubTaskEntity } from "../../core/entities/SubTaskEntity";
import type { TaskEntity } from "../../core/entities/TaskEntity";
import type { UserEntity } from "../../core/entities/UserEntity";
import { TaskStatusEnum } from "../../core/enum/TaskStatusEnum";

export class TaskSummaryService implements ITaskSummaryService {
	constructor(
		private taskRepository: ITaskRepository,
		private taskDomainService: ITaskDomainService,
	) {}

	public async getRangeSummaryAsync(
		workspaceId: string,
		includeSubtasks: boolean,
		startDate: Date,
		endDate: Date,
	): Promise<TasksSummaryDto> {
		const tasks = await this.taskRepository.getRangeAsync(
			workspaceId,
			includeSubtasks,
			startDate,
			endDate,
		);

		const completedToday = this.getCompletedSubtasksForRange(tasks);
		const missedToday = this.getMissedSubtasksForRange(tasks);

		return new TasksSummaryDto(tasks.length, completedToday, missedToday);
	}

	private getCompletedSubtasksForRange(tasks: TaskEntity[]) {
		return tasks
			.filter((task) => this.taskDomainService.isCompleted(task))

			.map(
				(task) =>
					new TaskSubtaskSummaryDto(
						task.id.toString(),
						task.name,
						task.description,
						task.assignees,
						true,
						true,
						task.subtasks,
					),
			);
	}

	private getMissedSubtasksForRange(tasks: TaskEntity[]) {
		return tasks
			.filter((task) => !this.taskDomainService.isCompleted(task))
			.map(
				(task) =>
					new TaskSubtaskSummaryDto(
						task.id.toString(),
						task.name,
						task.description,
						task.assignees,
						false,
						true,
						task.subtasks,
					),
			);
	}

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
			task.assignees,
		);
		const missedToday = this.getMissedSubtasks(
			subtasksForToday,
			task.assignees,
		);

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
		return subtasks.filter((st) => {
			if (!st.dueDate) return false;

			return this.taskDomainService.isToday(st);
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
		taskAssignee: UserEntity[],
	) {
		return subtasks
			.filter((st) => this.taskDomainService.isCompleted(st))
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(
						st.id.toString(),
						st.name,
						st.description,
						taskAssignee,
						true,
						true,
						st.subtasks,
					),
			);
	}

	/**
	 * Returns a list of subtasks that were missed today (due but not completed).
	 * @param subtasks Array of subtasks for today
	 * @param taskAssignee Assignee of the parent task
	 * @returns Array of TaskSubtaskSummaryDto for missed subtasks
	 */
	private getMissedSubtasks(
		subtasks: SubTaskEntity[],
		taskAssignee: UserEntity[],
	) {
		return subtasks
			.filter(
				(st) =>
					this.taskDomainService.isToday(st) &&
					st.status !== TaskStatusEnum.COMPLETED,
			)
			.map(
				(st) =>
					new TaskSubtaskSummaryDto(
						st.id.toString(),
						st.name,
						st.description,
						taskAssignee,
						false,
						true,
						st.subtasks,
					),
			);
	}
}

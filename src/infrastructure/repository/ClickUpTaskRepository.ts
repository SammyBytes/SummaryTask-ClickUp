import clickup from "@api/clickup";
import type { ITaskRepository } from "../../application/repository/ITaskRepository";
import { EnvManager } from "../../shared/EnvManager";
import type { ClickUpTask } from "../../application/models/clickup/IClickUpTask";
import { ClickupMapper } from "../helpers/ClickupMapper";
import type { TaskEntity } from "../../core/entities/TaskEntity";

export class ClickUpTaskRepository implements ITaskRepository {
	constructor() {
		clickup.auth(EnvManager.CLICKUP_PERSONAL_TOKEN);
	}
	public async getRangeAsync(
		workspaceId: string,
		includeSubtasks: boolean,
		startDate: Date,
		endDate: Date,
	): Promise<TaskEntity[]> {
		var response = await clickup.getFilteredTeamTasks({
			team_id: Number.parseInt(workspaceId) || 0,
			start: startDate.toISOString(),
			end: endDate.toISOString(),
			include_subtasks: includeSubtasks,
			team_Id: Number.parseInt(workspaceId) || 0,
		});

		if (response.status !== 200) {
			throw new Error("Error gettings tasks");
		}
		const tasks: ClickUpTask[] = response.data
			.tasks as unknown as ClickUpTask[];

		return tasks.map((task) => ClickupMapper.mapClickUpTask(task));
	}
	public async getAsync(
		taskId: string,
		includeSubtasks: boolean,
	): Promise<TaskEntity> {
		var response = await clickup.getTask({
			include_subtasks: includeSubtasks,
			task_id: taskId,
		});

		if (response.status !== 200) {
			throw new Error("Error getting task");
		}
		const data: ClickUpTask = response.data as ClickUpTask;
		return ClickupMapper.mapClickUpTask(data);
	}
}

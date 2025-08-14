import clickup from "@api/clickup";
import type { ITaskRepository } from "../../application/repository/ITaskRepository";
import { SubTaskEntity } from "../../core/entities/SubTaskEntity";
import { TaskEntity } from "../../core/entities/TaskEntity";
import { EnvManager } from "../../shared/EnvManager";
import type { ClickUpTask } from "../../application/models/clickup/IClickUpTask";
import type { ClickUpSubtask } from "../../application/models/clickup/IClickUpSubtask";

export class ClickUpTaskRepository implements ITaskRepository {
	public async getAsync(
		taskId: string,
		includeSubtasks: boolean,
	): Promise<TaskEntity> {
		clickup.auth(EnvManager.CLICKUP_PERSONAL_TOKEN);
		var response = await clickup.getTask({
			include_subtasks: includeSubtasks,
			task_id: taskId,
		});

		if (response.status !== 200) {
			throw new Error("Error getting task");
		}

		const data: ClickUpTask = response.data as ClickUpTask;
		const subtasksEntities: SubTaskEntity[] = (data.subtasks || []).map(
			(st: ClickUpSubtask) => {
				const completed = st.status?.status === "complete" || false;
				const dueDate = st.due_date ? new Date(Number(st.due_date)) : undefined;
				return new SubTaskEntity(st.id, st.name, completed, dueDate);
			},
		);

		const taskCompleted = data.status?.status === "complete" || false;
		const dueDate = data.due_date ? new Date(Number(data.due_date)) : undefined;
		const assignee = data.assignees ?? [];

		const task = new TaskEntity(
			Number(data.id),
			data.name,
			data.description || "",
			dueDate ?? new Date(),
			taskCompleted,
			assignee.map((a) => a.username),
			subtasksEntities,
		);
		return task;
	}
}

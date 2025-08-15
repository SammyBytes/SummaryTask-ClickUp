/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { ClickUpTask } from "../../application/models/clickup/IClickUpTask";
import { TaskEntity } from "../../core/entities/TaskEntity";
import { SubTaskEntity } from "../../core/entities/SubTaskEntity";
import { TaskStatusEnum } from "../../core/enum/TaskStatusEnum";
import { TaskPriorityEnum } from "../../core/enum/TaskPriorityEnum";
import { UserEntity } from "../../core/entities/UserEntity";

export class ClickupMapper {
	public static mapClickUpTask(clickup: ClickUpTask): TaskEntity {
		return new TaskEntity(
			Number.parseInt(clickup.id),
			clickup.name,
			clickup.description,
			ClickupMapper.mapTaskPriority(clickup.priority),
			ClickupMapper.mapTaskStatus(clickup.status.status),
			ClickupMapper.mapClickUpUser(clickup),
			clickup.subtasks?.map((st) => ClickupMapper.mapClickUpTask(st)) || [],
			clickup.due_date
				? new Date(Number.parseInt(clickup.due_date.toString()))
				: undefined,
		);
	}

	public static mapTaskStatus(status: string): TaskStatusEnum {
		if (status.includes("complete")) return TaskStatusEnum.COMPLETED;
		if (status.includes("in progress")) return TaskStatusEnum.IN_PROGRESS;
		if (status.includes("overdue")) return TaskStatusEnum.OVERDUE;
		if (status.includes("to do")) return TaskStatusEnum.TO_DO; // default
		return TaskStatusEnum.IN_PROGRESS; // default
	}

	public static mapTaskPriority(priority: number): TaskPriorityEnum {
		if (priority === 1) return TaskPriorityEnum.LOW;
		if (priority === 2) return TaskPriorityEnum.MEDIUM;
		if (priority === 3) return TaskPriorityEnum.HIGH;

		return TaskPriorityEnum.LOW; // default
	}

	public static mapClickUpUser(clickup: ClickUpTask): UserEntity[] {
		return (
			clickup.assignees?.map(
				(a) => new UserEntity(a.id.toString(), "", a.username, a.email),
			) || []
		);
	}
}

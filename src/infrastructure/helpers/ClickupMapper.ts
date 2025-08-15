/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { ClickUpTask } from "../../application/models/clickup/IClickUpTask";
import { TaskEntity } from "../../core/entities/TaskEntity";
import { TaskStatusEnum } from "../../core/enum/TaskStatusEnum";
import { TaskPriorityEnum } from "../../core/enum/TaskPriorityEnum";
import { UserEntity } from "../../core/entities/UserEntity";
import {
	CLICK_PRIORITY_HIGH,
	CLICK_PRIORITY_LOW,
	CLICK_PRIORITY_MEDIUM,
} from "../../application/constants/clickup/CickUpPriorityConst";

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
		if (status.includes("to do")) return TaskStatusEnum.TO_DO;

		return TaskStatusEnum.TO_DO; // default
	}

	public static mapTaskPriority(priority: number): TaskPriorityEnum {
		if (priority === CLICK_PRIORITY_LOW) return TaskPriorityEnum.LOW;
		if (priority === CLICK_PRIORITY_MEDIUM) return TaskPriorityEnum.MEDIUM;
		if (priority === CLICK_PRIORITY_HIGH) return TaskPriorityEnum.HIGH;

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

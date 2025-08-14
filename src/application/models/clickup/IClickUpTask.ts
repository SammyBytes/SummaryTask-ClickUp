import type { ClickUpStatus } from "./IClickUpStatus";
import type { ClickUpSubtask } from "./IClickUpSubtask";
import type { ClickUpUser } from "./IClickUpUser";
/**
 * Represents a ClickUp Task
 * Mapped to a Task Entity
 */
export interface ClickUpTask {
	id: string;
	name: string;
	description: string;
	status: ClickUpStatus;
	due_date?: number;
	assignees?: ClickUpUser[];
	subtasks?: ClickUpSubtask[];
}

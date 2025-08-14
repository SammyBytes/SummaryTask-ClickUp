import type { ClickUpStatus } from "./IClickUpStatus";
import type { ClickUpUser } from "./IClickUpUser";

/**
 * Represents a ClickUp Subtask
 * Mapped to a Task Subtask
 */
export interface ClickUpSubtask {
	id: string;
	name: string;
	status: ClickUpStatus;
	due_date?: number;
	completed?: boolean;
	assignees?: ClickUpUser[];
}

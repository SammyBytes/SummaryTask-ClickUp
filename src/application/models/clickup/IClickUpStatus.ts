/**
 * Represents a ClickUp Status
 * Mapped to a Task Status
 */
export interface ClickUpStatus {
	id?: string;
	status: string;
	color?: string;
	orderindex?: number;
	type?: string;
}

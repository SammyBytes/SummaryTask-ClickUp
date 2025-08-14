/**
 * Represents a ClickUp User
 * Mapped to a Task Assignee
 */
export interface ClickUpUser {
	id: number;
	username: string;
	color?: string;
	initials?: string;
	email: string;
	profilePicture?: string;
}

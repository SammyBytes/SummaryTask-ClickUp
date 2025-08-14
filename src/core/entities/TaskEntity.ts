import type { SubTaskEntity } from "./SubTaskEntity";

/**
 * Represents a Task entity
 *
 */
export class TaskEntity {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public dueDate: Date,
		public completed: boolean,
		public assignee: string[] = [],
		public subtasks: SubTaskEntity[] = [],
	) {}

	public IsCompleted(): boolean {
		if (!this.completed || !this.dueDate) {
			return false;
		}
		const now = new Date();
		return this.dueDate.toDateString() === now.toDateString();
	}

	public IsTaskDueToday(): boolean {
		if (!this.dueDate) {
			return false;
		}
		const now = new Date();
		return this.dueDate.toDateString() === now.toDateString();
	}
}

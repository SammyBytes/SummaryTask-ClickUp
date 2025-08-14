export class SubTaskEntity {
	constructor(
		public id: string,
		public name: string,
		public completed: boolean,
		public dueDate?: Date,
	) {}

	public IsTaskDueToday(): boolean {
		if (!this.dueDate) {
			return false;
		}
		const now = new Date();
		return this.dueDate.toDateString() === now.toDateString();
	}

	public IsCompleted(): boolean {
		return this.completed;
	}
}

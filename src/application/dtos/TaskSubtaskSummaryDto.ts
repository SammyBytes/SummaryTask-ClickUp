export class TaskSubtaskSummaryDto {
	constructor(
		public id: string,
		public name: string,
		public assignedTo: string[],
		public completed: boolean,
		public dueToday: boolean,
	) {}
}

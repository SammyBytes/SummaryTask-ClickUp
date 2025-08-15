import type { SubTaskEntity } from "../../core/entities/SubTaskEntity";
import type { UserEntity } from "../../core/entities/UserEntity";

export class TaskSubtaskSummaryDto {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public assignedTo: UserEntity[],
		public completed: boolean,
		public dueToday: boolean,
		public subTasks?: SubTaskEntity[],
	) {}
}

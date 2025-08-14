import type { ITaskRepository } from "../../application/repository/ITaskRepository";

export class ClickUpTaskRepository implements ITaskRepository {
	public async getAsync(taskId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve([]);
		});
	}
}

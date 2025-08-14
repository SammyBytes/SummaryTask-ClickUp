import { ClickUpTaskRepository } from "./infrastructure/repository/ClickUpTaskRepository";
import { TaskSummaryService } from "./infrastructure/services/TaskSummaryService";

async function main() {
	try {
		const taskRepository = new ClickUpTaskRepository();
		const taskSummaryService = new TaskSummaryService(taskRepository);
		const summary = await taskSummaryService.getTodaySummaryAsync(
			"86dx669kn",
			true,
		);
		console.log(summary);
	} catch (error) {
		console.error(error);
	}
}

main();

import { TaskDomainService } from "./core/domain/TaskDomainService";
import { ClickUpTaskRepository } from "./infrastructure/repository/ClickUpTaskRepository";
import { TaskSummaryService } from "./infrastructure/services/TaskSummaryService";

async function main() {
	try {
		const taskRepository = new ClickUpTaskRepository();
		const taskDomainService = new TaskDomainService();
		const taskSummaryService = new TaskSummaryService(
			taskRepository,
			taskDomainService,
		);
		const summary = await taskSummaryService.getTodaySummaryAsync(
			"86dx669kn",
			true,
		);
		console.log("Summary", summary);

		const rangeSummary = await taskSummaryService.getRangeSummaryAsync(
			"9017124594",
			true,
			new Date("2025-08-01"),
			new Date("2025-08-15"),
		);
		console.log("RangeSummary", rangeSummary);
	} catch (error) {
		console.error(error);
	}
}

main();

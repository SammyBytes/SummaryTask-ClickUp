import { TaskDomainService } from "./core/domain/TaskDomainService";
import { ClickUpTaskRepository } from "./infrastructure/repository/ClickUpTaskRepository";
import { TaskSummaryService } from "./infrastructure/services/TaskSummaryService";
import { EnvManager } from "./shared/EnvManager";

async function main() {
	try {
		const taskRepository = new ClickUpTaskRepository();
		const taskDomainService = new TaskDomainService();
		const taskSummaryService = new TaskSummaryService(
			taskRepository,
			taskDomainService,
		);

		const rangeSummary = await taskSummaryService.getRangeSummaryAsync(
			EnvManager.CLICKUP_WORKSPACE_ID,
			true,
			new Date("2025-08-21"),
			new Date("2025-08-31"),
		);
		console.log("RangeSummary", rangeSummary);
	} catch (error) {
		console.error(error);
	}
}

main();

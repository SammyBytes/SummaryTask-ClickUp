### summarytask-clickup

**summarytask-clickup** is a lightweight library for managing and summarizing tasks from ClickUp. It is designed with a **layered architecture**, keeping the code as **abstract and modular as possible**, so it can be migrated or adapted to other platforms in the future.

> ⚠️ This project only supports **BunJS** as the runtime. Using Node.js, Deno, or any other runtime is not allowed.

## Features

- Fetch and summarize subtasks due today.
- Generate lists of completed and missed tasks.
- Fully abstracted service and repository layers for easy migration.
- Integration-focused design for ClickUp, but code is platform-agnostic.

## Tech Stack

- **Runtime:** BunJS
- **Formatter:** Biome
- **Language:** TypeScript
- **Architecture:** Layered / Clean Architecture
- **Dependencies:** ClickUp API integration

## Installation

```bash
bun install
````

## Usage

```bash
bun run src/index.ts
```

### Example

```ts
import { TaskSummaryService } from "./application/services/TaskSummaryService";
import { ClickUpTaskRepository } from "./infrastructure/repository/ClickUpTaskRepository";
import { EnvManager } from "./shared/EnvManager";
import { TaskDomainService } from "./core/domain/TaskDomainService";

const repository = new ClickUpTaskRepository();
const taskDomainService = new TaskDomainService();
const service = new TaskSummaryService(repository, taskDomainService);

const summary = await service.getTodaySummaryAsync("task-id-123");
console.log("Summary", summary);

const rangeSummary = await service.getRangeSummaryAsync(
	EnvManager.CLICKUP_WORKSPACE_ID,
	true,
	new Date("2025-08-11"),
	new Date("2025-08-31"),
);  
console.log("RangeSummary", rangeSummary);
```

## Formatting

This project uses **Biome** for formatting and linting. You can format your code using:

```bash
bun run format
```

## Project Structure

```
src/
 ├─ application/        # Services, DTOs, and interfaces
 ├─ core/               # Entities and core business logic
 ├─ infrastructure/     # Repositories and API integrations
 └─ shared/             # Utility classes and environment management
```

## Scripts

All scripts are configured to run with Bun:

* `bun run start` → Runs the project
* `bun run format` → Formats the code with Biome
* `bun run lint` → Checks code formatting

## Notes

* Designed for **ClickUp integration**, but written to be **platform-agnostic**.
* Abstracted layers make it easy to switch services or APIs without refactoring business logic.


# API Data Models — TaskFlow

## DTO vs Domain Type

### TaskDto

`TaskDto` represents the data contract returned by the Tasks API.

File: `src/types/taskDto.ts`

Example:

- `completed: boolean`
- `priority: "LOW" | "MEDIUM" | "HIGH"`
- `assigned_to: string`

### Task

`Task` represents the internal data model used by TaskFlow components.

File: `src/types/task.ts`

Example:

- `status: "open" | "done"`
- `priority: "low" | "medium" | "high"`
- `assignee: string`

## Why Keep Them Separate?

- The API response structure may change over time. Separating DTOs from domain models prevents API-specific changes from directly affecting UI components.
- This separation improves code readability, maintainability, and separation of concerns.
- UI components depend on the domain model rather than the API contract.

## Mapping

File: `src/mappers/taskMapper.ts`

The `mapTaskDtoToTask()` function converts a `TaskDto` into a `Task`:

- `completed`: Converts a boolean into a domain status: `true` → `"done"`, `false` → `"open"`.
- `priority`: Converts uppercase API values (`"LOW"`, `"MEDIUM"`, `"HIGH"`) into lowercase domain values.
- `assigned_to`: Maps the API field to the domain field `assignee`.

The mapper creates a new `Task` object without mutating the original DTO.

## Data Flow

TasksPage → tasksService → apiClient → Tasks API

The API response is mapped back into `Task[]` before reaching TasksPage.

## TypeScript and Runtime Validation

- TypeScript provides compile-time type checking, not runtime validation.
- Defining `TaskDto` does not guarantee that the JSON returned by the API matches its structure.
- Libraries such as Zod can validate API responses at runtime.

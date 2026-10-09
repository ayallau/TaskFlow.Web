# Prop Drilling & State Management in TaskFlow

## 1. Where Does Prop Drilling Begin?

Prop drilling starts along the component chain:
`TasksPage` ➔ `TaskList` ➔ `TaskCard`

- **State Handlers Origin:** The functions `onDelete` and `onToggleStatus` are defined in `TasksPage` and passed down to `TaskList`.
- **Intermediate Passthrough:** `TaskList` does not consume these functions directly; it serves solely as a bridge to forward them down to `TaskCard`, where the buttons actually trigger them.

---

## 2. Why Avoid React Context for Now?

- **Shallow Component Tree:** The hierarchy has only a single intermediary layer. The overhead of setting up a Context (Context object, Provider, custom hook, and TypeScript definitions) introduces unnecessary boilerplate and over-engineering at this stage.
- **Component Composition Alternative:** If the goal is to avoid passing props through `TaskList`, component composition (e.g., passing `children` or rendering `TaskCard` directly in `TasksPage`) is a cleaner and simpler solution than global state.

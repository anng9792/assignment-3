# To Do List in React

## Mockup
I sketched the UI with two categories most applicableto myself, School and Work. Each category contains tasks with a due date and an Add Task row.

## Component Hierarchy
TodoApp
└─ TaskTable
   ├─ TableHeader
   ├─ TaskCategorySection
   │  ├─ TaskRow
   │  └─ AddTaskRow

   TaskTable handles layout. TaskCategorySection groups tasks by category. TaskRow shows a single task row. AddTaskRow is a small form where you type a new task.

## Static build
For the first version I just hardcoded some fake tasks. Nothing worked yet, but it helped me figure out how everything would be organized on the page.

## Minimal but complete state
I identified the smallest state the UI needs:
- categories: array of { id, name, tasks }
- each task: { id, text, due, done }

## Where state lives
- The list of categories/tasks lives in TodoApp so everything uses the same source of truth.
- Form fields for adding a task live in AddTaskRow because only that form needs them.
- Child components get data through props and request changes through callbacks from the parent.

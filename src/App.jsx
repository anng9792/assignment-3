import React from "react";

const MOCK = [
  {
    id: "school",
    name: "School",
    tasks: [
      { id: "s1", 
        text: "Task 1", 
        due: "10-05-2025", 
        done: false},
      { id: "s2", 
        text: "Task 2", 
        due: "10-12-2025", 
        done: true}
    ]
  },
  {
    id: "work",
    name: "Work",
    tasks: [
      { id: "w1", 
        text: "Task 1", 
        due: "10-03-2025", 
        done: true},
      { id: "w2", 
        text: "Task 2", 
        due: "10-08-2025", 
        done: false}
    ]
  }
];

function TableHeader() {
  return (
    <div className="row header">
      <div className="cell grow">Task</div>
      <div className="cell">Due Date</div>
      <div className="cell"></div>
    </div>
  );
}

function TaskRow({ task }) {
  return (
    <div className="row">
      <div className="cell grow">
        <input type="checkbox" checked={task.done} readOnly />
        <span className={`task ${task.done ? "done" : ""}`}>{task.text}</span>
      </div>
      <div className="cell">{task.due}</div>
      <div className="cell">
        <button className="ghost" title="Remove">X</button>
      </div>
    </div>
  );
}

function AddTaskRow() {
  return (
    <div className="row add">
      <div className="cell grow">
        <input placeholder="Add task" />
      </div>
      <div className="cell">
        <input type="date" />
      </div>
      <div className="cell">
        <button>Add</button>
      </div>
    </div>
  );
}

function TaskCategorySection({ category }) {
  return (
    <div className="category">
      <div className="categoryTitle">{category.name}</div>
      {category.tasks.map(t => <TaskRow key={t.id} task={t} />)}
      <AddTaskRow />
    </div>
  );
}

function TaskTable({ data }) {
  return (
    <div className="table">
    <TableHeader />
    {data.map(cat => <TaskCategorySection key={cat.id} category={cat} />)}
    </div>
  );
}

export default function App() {
  return (
    <main className="container">
      <h1>To Do List</h1>
      <TaskTable data={MOCK} />
    </main>
  );
}
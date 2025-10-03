import React, { useState } from "react";

const initialData = [
  {
    id: "school",
    name: "School",
    tasks: []
  },
  {
    id: "work",
    name: "Work",
    tasks: []
  }
];

function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2,7)
  }`;
}

function TableHeader() {
  return (
    <div className="row header">
      <div className="cell grow">Task</div>
      <div className="cell">Due Date</div>
      <div className="cell"></div>
    </div>
  );
}

function TaskRow({ task, onToggle, onRemove }) {
  return (
    <div className="row">
      <div className="cell grow">
        <input 
        type="checkbox" 
        checked={task.done} 
        onChange={() => onToggle(task.id)}
        aria-label={`toggle ${task.text}`}
        />
        <span className={`task ${task.done ? "done" : ""}`}>{task.text}</span>
      </div>
      <div className="cell">{task.due}</div>
      <div className="cell">
        <button className="ghost" onClick= {() => onRemove(task.id)} title="Remove">
          X
          </button>
      </div>
    </div>
  );
}

function AddTaskRow({ onAdd }) {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");

  function submit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd({ id: uid("t"), text: clean, due: due || "", done: false });
    setText("");
    setDue("");
  }

  return (
    <form className="row add" onSubmit={submit}>
      <div className="cell grow">
        <input
        placeholder="Add Task"
        value={text}
        onChange={e => setText(e.target.value)}
        aria-label="task text"
        />
      </div>
      <div className="cell">
        <input
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          aria-label="due date"
          />
      </div>
      <div className="cell">
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

function TaskCategorySection({ category, onAddTask, onToggleTask, onRemoveTask }) {
  return (
    <div className="category">
      <div className="categoryTitle">{category.name}</div>
      {category.tasks.map(t => (
        <TaskRow 
        key={t.id} 
        task={t}
        onToggle={taskId => onToggleTask(category.id, taskId)}
        onRemove={taskId => onRemoveTask(category.id, taskId)} 
        />))}
      <AddTaskRow onAdd={task => onAddTask(category.id, task)} />
    </div>
  );
}

function TaskTable({ data, onAddTask, onToggleTask, onRemoveTask }) {
  return (
    <div className="table">
    <TableHeader />
    {data.map(cat => (
      <TaskCategorySection 
      key={cat.id} 
      category={cat} 
      onAddTask={onAddTask}
      onToggleTask={onToggleTask}
      onRemoveTask={onRemoveTask}
      />
    ))}
    </div>
  );
}

export default function App() {
  const [categories, setCategories] = useState(initialData);

  function addTask(categoryId, newTask) {
    setCategories(prev =>
      prev.map(c =>
        c.id === categoryId ? { ...c, tasks: [...c.tasks, newTask] } : c
      )
    );
  }

  function toggleTask(categoryId, taskId) {
    setCategories(prev =>
      prev.map(c =>
        c.id === categoryId 
        ? { 
          ...c, 
          tasks: c.tasks.map(t =>
          t.id === taskId ? { ...t, done: !t.done } : t
        )
      }
      : c
      )
    );
  }

  function removeTask(categoryId, taskId) {
    setCategories(prev =>
      prev.map(c =>
        c.id === categoryId
        ? { ...c, tasks: c.tasks.filter(t => t.id !== taskId) }
        : c
      )
    );
  }

  return (
    <main className="container">
      <h1>To Do List</h1>
      <TaskTable 
      data={categories}
      onAddTask={addTask}
      onToggleTask={toggleTask}
      onRemoveTask={removeTask}
      />
    </main>
  );
}
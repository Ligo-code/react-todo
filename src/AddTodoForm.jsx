// Component that is responsible for adding a new todo

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(e) {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }
  function handleAddTodo(e) {
    e.preventDefault();
    if (!todoTitle.trim()) return;
    onAddTodo({ title: todoTitle.trim(), id: uuidv4() });
    setTodoTitle("");
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        type="text"
        placeholder="Title"
        name="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTodoForm;


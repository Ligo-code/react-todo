// Component that is responsible for adding a new todo

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputWithLabel from "./InputWithLabel";

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
      <InputWithLabel
        id="todoTitle"
        type="text"
        placeholder="Title"
        name="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
        >
          Title
        </InputWithLabel>     
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTodoForm;

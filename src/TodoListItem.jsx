import { useState } from "react";

function TodoListItem({ todo, onRemoveTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    if (!editedTitle.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    onEditTodo(todo.id, editedTitle);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setEditedTitle(todo.title);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    onRemoveTodo(todo.id);
  }

  return (
    <li>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="todo-input"
          />
          <button onClick={handleSaveClick} className="save-button">
            Save
          </button>
          <button onClick={handleCancelClick} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <div className="task-container">
          <span className="task-title">{todo.title}</span>
          <div className="button-container">
            <button onClick={handleEditClick} className="edit-button">
              Edit
            </button>
            <button onClick={handleDeleteClick} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;

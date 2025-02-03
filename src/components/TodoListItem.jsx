import React, { useState } from "react";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isRemoving, setIsRemoving] = useState(false);

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
    setIsRemoving(true);
    setTimeout(() => onRemoveTodo(todo.id), 300); // Анимация удаления
  }

  return (
    <li className={`${styles.ListItem} ${isRemoving ? styles.removing : ""}`}>
      {isEditing ? (
        <div className={styles.EditContainer}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.Input}
          />
          <button onClick={handleSaveClick} className={styles.SaveButton}>
            Save
          </button>
          <button onClick={handleCancelClick} className={styles.CancelButton}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.TaskContainer}>
          <span className={styles.TaskTitle}>{todo.title}</span>
          <div className={styles.ButtonContainer}>
            <button onClick={handleEditClick} className={styles.EditButton}>
              ✏️
            </button>
            <button onClick={handleDeleteClick} className={styles.DeleteButton}>
              🗑️
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;
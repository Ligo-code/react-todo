import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TodoListItem({ todo, onRemoveTodo, onEditTodo, onToggleCompleted, currentUser, users }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isRemoving, setIsRemoving] = useState(false);

  // Проверяем, что `users` передаётся корректно
  console.log("Users:", users);
  console.log("Todo assignedTo:", todo.assignedTo);

   // Определяем, на кого назначена задача
const assignedChildren = Array.isArray(todo.assignedTo) && users.length > 0
? todo.assignedTo
    .map((childId) => {
      console.log(`Searching for childId: ${childId}`);
      console.log("Available users:", users);

      const child = users.find((user) => user.id === childId);

      console.log("Found child:", child);

      return child ? child.fields?.username || "Unknown" : "Unknown";
    })
    .join(", ")
: "Unassigned";

console.log(`Assigned to: ${assignedChildren}`);

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
    setTimeout(() => onRemoveTodo(todo.id), 300);
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
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleCompleted(todo.id)}
            className={styles.Checkbox}
          />
          <span className={`${styles.TaskTitle} ${todo.completed ? styles.completed : ""}`}>
            {todo.title}
          </span>
          {/*Показываем родителю, кому назначена задача */}
          {currentUser.role === "parent" && (
            <span className={styles.AssignedTo}>
              (Assigned to: {assignedChildren})
            </span>
          )}
          {currentUser.role === "parent" && (
            <div className={styles.ButtonContainer}>
              <button onClick={handleEditClick} className={styles.EditButton}>
              <FaEdit size={16} />
              </button>
              <button onClick={handleDeleteClick} className={styles.DeleteButton}>
              <FaTrash size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    assignedTo: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  onToggleCompleted: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.array.isRequired,
};

export default TodoListItem;
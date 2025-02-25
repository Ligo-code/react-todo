import React, { useState } from "react";
import styles from "./AddTodoForm.module.css";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo, users }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTodoTitle(e.target.value);
    setError("");
  };

  const handleAssignedToChange = (e) => {
    setAssignedTo(e.target.value);
    setError("");
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!todoTitle.trim()) {
      setError("Task title cannot be empty!");
      return;
    }
    if (todoTitle.length > 100) {
      setError("Task title is too long (max 100 characters)!");
      return;
    }
    if (!assignedTo) {
      setError("Please select a user to assign the task to!");
      return;
    }

    setIsLoading(true);

    try {
      await onAddTodo({ title: todoTitle.trim() }, assignedTo);
      setTodoTitle("");
      setAssignedTo("");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Failed to add task. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.inputContainer}>
        <InputWithLabel
          id="todoTitle"
          value={todoTitle}
          onInputChange={handleTitleChange}
          type="text"
          placeholder="Enter a title"
          className={styles.input}
          disabled={isLoading}
        />
        <select
          value={assignedTo}
          onChange={handleAssignedToChange}
          className={styles.select}
          disabled={isLoading}
        >
          <option value="">Assign to...</option>
          {users
            ?.filter((user) => user.fields.role === "child")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.fields.username}
              </option>
            ))}
        </select>
        <button type="submit" className={styles.addButton} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default AddTodoForm;
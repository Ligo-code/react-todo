import React, { useState } from "react";
import styles from "./AddTodoForm.module.css";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
    setError("");
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    if (!todoTitle.trim()) {
      setError("Task title cannot be empty!");
      return;
    }
    if (todoTitle.length > 100) {
      setError("Task title is too long (max 100 characters)!");
      return;
    }

    setIsLoading(true);

    try {
      await onAddTodo({ title: todoTitle.trim() });
      setTodoTitle("");
    } catch (error) {
      setError("Failed to add task. Try again!");
    } finally {
      setIsLoading(false);
    }
  }

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
};

export default AddTodoForm;
import React, { useState, useMemo } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

function TodoList({ todos = [], onRemoveTodo, onEditTodo, onToggleCompleted, currentUser, users }) {
  if (!currentUser) {
    return <p className={styles.error}>Error: No user found.</p>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const totalPages = Math.ceil(todos.length / tasksPerPage);

  const currentTasks = useMemo(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return todos.slice(indexOfFirstTask, indexOfLastTask);
  }, [todos, currentPage, tasksPerPage]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.taskContainer}>
      <ul className={styles.todoList}>
        {currentTasks.length === 0 ? (
          <p key="empty-message" className={styles.emptyMessage}>
            No tasks found. Add a new task!
          </p>
        ) : (
          currentTasks.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={currentUser.role !== "parent" ? null : onRemoveTodo}
              onEditTodo={currentUser.role !== "parent" ? null : onEditTodo}
              onToggleCompleted={onToggleCompleted}
              currentUser={currentUser}
              users={users}
            />
          ))
        )}
      </ul>

      {totalPages > 1 && (
  <div className={styles.pagination}>
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      aria-label="Previous page"
    >
      ◀ Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage >= totalPages}
      aria-label="Next page"
    >
      Next ▶
    </button>
  </div>
      )}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  onToggleCompleted: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.array.isRequired,
};

export default TodoList;


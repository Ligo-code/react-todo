
import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";


function TodoList({
  todos = [],
  onRemoveTodo,
  onEditTodo,
  onToggleCompleted,
  currentUser,
  users,
}) {
  if (!currentUser) {
    return <p className={styles.error}>Error: No user found.</p>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4; // Количество задач на странице
  const totalPages = Math.ceil(todos.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = todos.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className={styles.todoList}>
        {currentTasks.length === 0 ? (
          <p className={styles.emptyMessage}>No tasks found. Add a new task!</p>
        ) : (
          currentTasks.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={currentUser.role === "parent" ? onRemoveTodo : null}
              onEditTodo={currentUser.role === "parent" ? onEditTodo : null}
              onToggleCompleted={onToggleCompleted} // Ребенок может отмечать выполнение
              currentUser={currentUser}
            users={users || []} // Передаем users с безопасной проверкой
          />
        ))
      )}
    </ul>

          {/* Кнопки пагинации */}
          <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          ◀ Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={nextPage} disabled={currentPage >= totalPages}>
          Next ▶
        </button>
      </div>
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
  users: PropTypes.array, // Добавляем users в пропсы
};

export default TodoList;
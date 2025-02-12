import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

function TodoList({ todos, onRemoveTodo, onEditTodo, onToggleCompleted, currentUser, users }) {
  if (!currentUser) {
    return <p className={styles.error}>Error: No user found.</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.length === 0 ? (
        <p className={styles.emptyMessage}>No tasks found. Add a new task!</p>
      ) : (
        todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={currentUser.role === "parent" ? onRemoveTodo : null}
            onEditTodo={currentUser.role === "parent" ? onEditTodo : null}
            onToggleCompleted={onToggleCompleted} // ✅ Ребенок может отмечать выполнение
            currentUser={currentUser}
            users={users || []} // ✅ Передаем users с безопасной проверкой
          />
        ))
      )}
    </ul>
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
  users: PropTypes.array, // ✅ Добавляем users в пропсы
};

TodoList.defaultProps = {
  users: [], // ✅ Если users не загружены, передаем пустой массив
};

export default TodoList;

import React from "react";
import TodoListItem from "./TodoListItem.jsx";
import styles from "./TodoList.module.css";

function TodoList({ todos, onRemoveTodo, onEditTodo }) {
  return (
    <ul className={styles.todoList}>
      {todos.length === 0 ? (
        <p className={styles.emptyMessage}>No tasks found. Add a new task!</p>
      ) : (
        todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;
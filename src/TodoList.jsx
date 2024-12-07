// Component that is responsible for rendering the todo list

import React from "react";
import TodoListItem from "./TodoListItem.jsx";

function TodoList({ todos, onRemoveTodo, onEditTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;

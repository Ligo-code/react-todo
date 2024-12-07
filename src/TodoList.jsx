// Component that is responsible for rendering the todo list

import React from "react";
import TodoListItem from "./TodoListItem.jsx"

function TodoList({ todos }) { // Получаем список задач как пропс
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} /> // Передаем "todo" как пропс
      ))}
    </ul>
  );
}

export default TodoList;

/*
*/

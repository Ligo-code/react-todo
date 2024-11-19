// Component that is responsible for rendering the todo list

import React from "react";
import TodoListItem from "./TodoListItem.jsx"

/* JSX */
let todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review my code" },
  { id: 3, title: "Push the changes to GitHub" }
];

function TodoList() {

  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </ul>

  )
}

export default TodoList;

/*Отвечает за отображение списка всех задач.
Данные:
Локальный массив todoList содержит несколько задач с id и title.
Рендеринг:
Проходит по массиву задач с помощью .map() и для каждой задачи рендерит компонент TodoListItem, передавая данные задачи через проп item.
У каждой задачи устанавливается уникальный key (идентификатор).
*/

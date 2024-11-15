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
      <TodoListItem key={item.id} item={item}/> 
      ))}
    </ul>

  )


}

export default TodoList;


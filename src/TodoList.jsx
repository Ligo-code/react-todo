import React from "react";


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
        <li key={item.id}>
          {(item.title).trim()} </li>
      ))}
    </ul>

  )


}

export default TodoList;

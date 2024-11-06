import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as React from 'react';

let todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review my code" },
  { id: 3, title: "Push the changes to GitHub" }
];


function App() {

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            {(item.title).trim()} </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// my first assignment
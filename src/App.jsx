import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as React from 'react';
import TodoList from './todoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'


function App() {

  return (
    <div>
      <h1>Todo List</h1>
     < AddTodoForm/>
     < TodoList/>
    </div>
  );
}

export default App;
// my first assignment
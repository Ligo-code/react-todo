// This is the main component

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as React from 'react';
import TodoList from './todoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'


function App() {
  const [newTodo, setNewTodo] = useState('');   

  return (
    <div>
      <h1>Todo List</h1>
      < AddTodoForm onAddTodo={setNewTodo} /> 
      < TodoList /> 
    </div>
  );
}

export default App;

/* *Импорты:
Импортируются useState из React, компонент AddTodoForm и TodoList, а также CSS стили и логотип React.
Состояние:
Используется хук useState для управления состоянием newTodo (текущий текст задачи).
Рендеринг:
Отображает заголовок "Todo List".
Подключает компонент AddTodoForm, передавая функцию setNewTodo через проп onAddTodo.
Показывает текст новой задачи под формой.
Отображает список задач через компонент TodoList.
*/

/*Пример работы всего приложения:
На экране отображается список задач, указанных в массиве todoList.
Пользователь вводит текст в поле "Title" и нажимает "Add".
AddTodoForm вызывает handleAddTodo, передает текст задачи в App, где обновляется состояние newTodo.
Новый текст задачи отображается в <p>New Todo: {newTodo}</p>, но сам список задач (todoList) не обновляется, так как он статически определен. */
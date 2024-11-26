// This is the main component

import { useState } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";

function App() {
  const [todoList, setTodoList] = useState([]); // Состояние для списка заданий);


  function addTodo(newTodo) {
    try {
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }; // Добавляем задачу в список

  return (
    <div>
      {/* Подключаем изображение */}
      <img src="/images/checklist.png" alt="Checklist" style={{ width: "100px", marginBottom: "20px" }} />
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todoList} /> {/* Передаем список задач */}
    </div>
  );
}

export default App;

/* Компонент App
Ответственность: основной компонент приложения.

Что он делает:

Определяет состояние newTodo с помощью useState.
Передает функцию изменения состояния (setNewTodo) в компонент AddTodoForm как onAddTodo.
Отображает заголовок "Todo List", компонент AddTodoForm и компонент TodoList.
Как это работает:

Когда AddTodoForm вызывает setNewTodo, состояние newTodo обновляется, 
но здесь это состояние пока не используется для добавления новой задачи в список.*/
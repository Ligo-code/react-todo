import { useState, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";

function App() {
  const [todoList, setTodoList] = useState([]); // Начальное состояние пустое
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  // useEffect для асинхронной загрузки данных
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: [
              { id: "1", title: "Learn React" },
              { id: "2", title: "Learn Async/Await" }
            ]
          }
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList); // Устанавливаем задачи
      setIsLoading(false); // Завершаем загрузку
    });
  }, []);

  // useEffect для сохранения данных в localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // Добавление новой задачи
  function addTodo(newTodo) {
    if (todoList.some((todo) => todo.title === newTodo.title)) {
      alert("Task already exists!");
      return;
    }
    setTodoList([...todoList, newTodo]);
  }

  // Удаление задачи
  function removeTodo(todoId) {
    const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(updatedTodoList);
  }

  // Редактирование задачи
  function editTodo(todoId, newTitle) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <img
        src="/images/checklist.png"
        alt="Checklist"
        style={{ width: "100px", marginBottom: "20px" }}
      />
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList
            todos={todoList}
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
          />
        </>
      )}
    </>
  );
}

export default App;

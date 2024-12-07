import { useState, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    try {
      return savedTodoList ? JSON.parse(savedTodoList) : [];
    } catch (error) {
      console.error("Error parsing savedTodoList:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    if (todoList.some(todo => todo.title === newTodo.title)) {
      alert("Task already exists!");
      return;
    }

    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(todoId) {
    const updatedTodoList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(updatedTodoList); // Обновляем список задач
  }

  function editTodo(todoId, newTitle) {
    const updatedTodoList = todoList.map(todo =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    setTodoList(updatedTodoList); // Обновляем список задач
  }

  return (
    <>
      <img
        src="/images/checklist.png"
        alt="Checklist"
        style={{ width: "100px", marginBottom: "20px" }}
      />
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todoList}
        onRemoveTodo={removeTodo}
        onEditTodo={editTodo}
      />
    </>
  );
}

export default App;
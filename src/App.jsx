import { useState, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";

// Функция для загрузки данных из Airtable
const fetchData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
  };

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data from Airtable:", data); // Логируем полученные данные
    const todos = data.records.map((todo) => ({
      id: todo.id,
      title: todo.fields.Title, //  поле называется "Title" как в базе, а не "title"
    }));
    return todos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Возвращаем пустой список при ошибке
  }
};

// Функция добавления новой задачи в Airtable
const postTodo = async (todoTitle) => {
  const airtableData = {
    fields: {
      Title: todoTitle, // поле называется "Title" как в базе, а не "title"
    },
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airtableData),
  };

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Post response:", data); // Логируем ответ при добавлении задачи
    return { id: data.id, title: todoTitle }; // Возвращаем добавленную задачу с id
  } catch (error) {
    console.error("Error posting data:", error);
    return null; // При ошибке возвращаем null
  }
};

function App() {
  const [todoList, setTodoList] = useState([]); // Начальное состояние пустое
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

  // useEffect для загрузки данных из Airtable
  useEffect(() => {
    const loadData = async () => {
      try {
        const todos = await fetchData();
        console.log("Loaded todos:", todos); // Логируем загруженные задачи
        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        setError("Error loading todos");
        setIsLoading(false);
      }
    };
    loadData();
  }, []); // Загружаем только один раз при монтировании компонента

  // Добавление новой задачи
  const addTodo = async (newTodo) => {
    const data = await postTodo(newTodo.title);
    if (data) {
      setTodoList((prevTodoList) => [...prevTodoList, data]); // Добавляем новую задачу
    } else {
      setError("Error adding todo");
    }
  };

  // Удаление задачи
  const removeTodo = (todoId) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(updatedTodoList); // Обновляем список задач после удаления
  };

  // Редактирование задачи
  const editTodo = (todoId, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    setTodoList(updatedTodoList); // Обновляем список задач после редактирования
  };

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
      ) : error ? (
        <p>{error}</p> // Показываем сообщение об ошибке, если она произошла
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList
            todos={todoList} // Передаем список задач в компонент TodoList
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
          />
        </>
      )}
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const fetchData = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
  };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.records.map((todo) => ({
      id: todo.id,
      title: todo.fields.Title,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postTodo = async (todoTitle) => {
  const airtableData = {
    fields: { Title: todoTitle },
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airtableData),
  };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { id: data.id, title: todoTitle };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const deleteTodo = async (todoId) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
  };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${todoId}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

const updateTodo = async (todoId, updatedTitle) => {
  const airtableData = {
    fields: { Title: updatedTitle },
  };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airtableData),
  };

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${todoId}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const todos = await fetchData();
        setTodoList(todos);
      } catch (error) {
        setError("Error loading todos");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const data = await postTodo(newTodo.title);
      setTodoList((prevTodoList) => [data, ...prevTodoList]);
    } catch (error) {
      setError("Failed to add task. Please try again.");
    }
  };

  const removeTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== todoId)
      );
    } catch (error) {
      setError("Failed to delete task. Please try again.");
    }
  };

  const editTodo = async (todoId, newTitle) => {
    try {
      await updateTodo(todoId, newTitle);
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === todoId ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      setError("Failed to update task. Please try again.");
    }
  };

  return (
    <div className={`app ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} title="Toggle Theme">
          {isDarkTheme ? "🌞" : "🌜"}
        </button>
      </div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <img
                  src="/images/checklist.png"
                  alt="Checklist"
                  className="app-logo"
                />
                <h1>Todo List</h1>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <div className="todo-card">
                    <AddTodoForm onAddTodo={addTodo} />
                    <TodoList
                      todos={todoList}
                      onRemoveTodo={removeTodo}
                      onEditTodo={editTodo}
                    />
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
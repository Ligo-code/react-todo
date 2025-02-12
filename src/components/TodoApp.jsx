import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import styles from "./TodoApp.module.css";

function TodoApp({ currentUser }) {
  const [todoList, setTodoList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  console.log("Current User:", currentUser);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data.records || []);
      } catch (error) {
        console.error("❌ Error loading users:", error);
        setError("Failed to load users.");
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const loadData = async () => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch tasks.");
      const data = await response.json();
      console.log("Tasks from Airtable:", data.records);

      const tasks = data.records.map((record) => ({
        id: record.id,
        title: record.fields.Title,
        createdTime: record.fields.createdTime,
        completed: record.fields.completed || false,
        assignedTo: record.fields.assigned_to || [],
      }));
      setTodoList(tasks);
    } catch (error) {
      console.error("❌ Error loading tasks:", error);
      setError("Failed to load tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (newTodo, assignedTo) => {
    try {
      const assignedArray = Array.isArray(assignedTo) ? assignedTo : [assignedTo];

      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Title: newTodo.title,
              assigned_to: assignedArray,
              completed: false,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error adding task:", errorData);
        throw new Error("Failed to add task.");
      }

      console.log("✅ Task added successfully.");
      loadData();
    } catch (error) {
      console.error("❌ Error adding task:", error);
      setError("Failed to add task. Please try again.");
    }
  };

  const removeTodo = async (todoId) => {
    try {
      await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks/${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );
      loadData();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  const editTodo = async (todoId, newTitle) => {
    try {
      await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks/${todoId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Title: newTitle,
            },
          }),
        }
      );
      loadData();
    } catch (error) {
      console.error("Error editing task:", error);
      setError("Failed to update task. Please try again.");
    }
  };

  const toggleCompleted = async (todoId) => {
    try {
      const todo = todoList.find((todo) => todo.id === todoId);
      await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks/${todoId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              completed: !todo.completed,
            },
          }),
        }
      );
      loadData();
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setError("Failed to toggle task completion. Please try again.");
    }
  };

  // Фильтрация задач
  const parentTasks = todoList.filter((task) =>
    currentUser.role === "parent" && Array.isArray(task.assignedTo)
  );

  const childTasks = todoList.filter((task) =>
    currentUser.role === "child" &&
    Array.isArray(task.assignedTo) &&
    task.assignedTo.includes(currentUser.id)
  );

  // Сортировка задач
  const sortedTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (sortType === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortType === "createdTime") {
        return sortOrder === "asc"
          ? new Date(a.createdTime) - new Date(b.createdTime)
          : new Date(b.createdTime) - new Date(a.createdTime);
      }
      return 0;
    });
  };

  return (
    <div className={styles.todoApp}>
      <div className="sort-buttons">
        <button
          onClick={() => setSortType("title")}
          className={sortType === "title" ? "active" : ""}
        >
          Sort by Title
        </button>
        <button
          onClick={() => setSortType("createdTime")}
          className={sortType === "createdTime" ? "active" : ""}
        >
          Sort by Created Time
        </button>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      {currentUser.role === "parent" && (
        <>
          <h2>Your Created Tasks</h2>
          <AddTodoForm onAddTodo={addTodo} users={users} />
        </>
      )}
      <TodoList
        todos={sortedTasks(currentUser.role === "parent" ? parentTasks : childTasks)}
        onRemoveTodo={removeTodo}
        onEditTodo={editTodo}
        onToggleCompleted={toggleCompleted}
        currentUser={currentUser}
        users={users || []} 
      />
      {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : null}
    </div>
  );
}

export default TodoApp;

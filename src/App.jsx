import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import HomeScreen from "./components/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import "./App.css";

function App() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Состояние текущего пользователя

  return (
    <div className={`app ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} title="Toggle Theme">
          {isDarkTheme ? "🌞" : "🌜"}
        </button>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/app"
            element={isLoggedIn ? <TodoApp currentUser={currentUser} /> : <Navigate to="/login" />}
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
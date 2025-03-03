import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import HomeScreen from "./components/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import "./App.css";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";

function App() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Состояние текущего пользователя
  console.log("App rendered");

  return (
    <div className={`app ${isDarkTheme ? "dark-theme" : ""}`}>
      {/*Новый контейнер для кнопок */}
      <div className="header">
        <Link to="/" className="nav-link">
          <FaHome size={20} /> Home
        </Link>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {isDarkTheme ? <FaSun size={30} /> : <FaMoon size={30} />}
        </button>
      </div>
      {/* Основной контент */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/app"
            element={
              isLoggedIn ? (
                <TodoApp currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

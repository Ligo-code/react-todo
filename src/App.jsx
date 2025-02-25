import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import HomeScreen from "./components/HomeScreen";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import "./App.css";

function App() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Состояние текущего пользователя
  const navigate = useNavigate();
  console.log("App rendered");

  return (
    <div className={`app ${isDarkTheme ? "dark-theme" : ""}`}>
      {/*Новый контейнер для кнопок */}
      <div className="header">
        <button className="home-button" onClick={() => navigate("/")}>
          🏠 Home
        </button>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {isDarkTheme ? "🌞" : "🌜"}
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

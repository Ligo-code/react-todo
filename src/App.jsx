import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import HomeScreen from "./components/HomeScreen";
import AuthForm from "./components/AuthForm"; // Объединенная форма (Login + Register)
import TodoApp from "./components/TodoApp";
import Footer from "./components/Footer";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import "./App.css";

function App() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className={`appContainer ${isDarkTheme ? "dark-theme" : ""}`}>
      {/* Шапка с кнопками */}
      <header className="header">
        <Link to="/" className="nav-link">
          <FaHome size={20} /> Home
        </Link>
        <button className="theme-toggle" onClick={() => {
    console.log("Тема переключена:", isDarkTheme ? "Светлая" : "Темная");
    toggleTheme();
}} title="Toggle Theme">
  {isDarkTheme ? <FaSun size={30} /> : <FaMoon size={30} />}
</button>
      </header>

      {/* Основной контент */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<AuthForm type="register" />} />
          <Route
            path="/login"
            element={
              <AuthForm type="login" setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/app"
            element={
              isLoggedIn ? <TodoApp currentUser={currentUser} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>

      {/* Подвал */}
      <Footer />
    </div>
  );
}

export default App;

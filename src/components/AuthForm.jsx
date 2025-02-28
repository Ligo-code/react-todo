import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { ThemeContext } from "../ThemeContext"; // Подключаем контекст темы
import styles from "./AuthForm.module.css";

function AuthForm({ type, setIsLoggedIn, setCurrentUser }) {
  const { isDarkTheme } = useContext(ThemeContext); // Получаем текущую тему
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Только для регистрации
  const [error, setError] = useState("");

  const allowedRoles = ["parent", "child"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || (type === "register" && !role)) {
      setError("Please fill in all fields.");
      return;
    }

    if (type === "register") {
      if (!allowedRoles.includes(role)) {
        setError(`Invalid role selected: ${role}`);
        return;
      }
      
      // Хеширование пароля перед отправкой
      const hashedPassword = bcrypt.hashSync(password.trim(), 10);

      try {
        const payload = {
          fields: {
            username: username.trim(),
            password: hashedPassword,
            role: role,
          },
        };

        console.log("🔍 Sending registration data:", JSON.stringify(payload));

        const response = await fetch(
          `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Users`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to register user.");
        }

        console.log("✅ User registered successfully!");
        navigate("/login");

      } catch (error) {
        console.error("Registration error:", error);
        setError(error.message || "Failed to register user.");
      }
    } else {
      // Логин
      try {
        console.log("Attempting to log in with:", { username, password });
        const response = await fetch(
          `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Users?filterByFormula={username}='${username}'`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        console.log("User data:", data);

        if (data.records.length === 1) {
          const user = data.records[0];
          const hashedPassword = user.fields.password;

          if (bcrypt.compareSync(password, hashedPassword)) {
            setIsLoggedIn(true);
            setCurrentUser({
              id: user.id,
              username: user.fields.username,
              role: user.fields.role,
            });
            console.log("✅ Login successful!");
            navigate("/app");
          } else {
            setError("Invalid username or password.");
          }
        } else {
          setError("Invalid username or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className={`${styles.authContainer} ${isDarkTheme ? "dark-theme" : ""}`}>
      <h2>{type === "register" ? "Register" : "Login"}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "register" && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>
        )}
        <button type="submit">{type === "register" ? "Register" : "Login"}</button>
      </form>
    </div>
  );
}

export default AuthForm;

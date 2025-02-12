import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login({ setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting to log in with:", { username, password });
      const response = await fetch(
        `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/Users?filterByFormula=AND({username}='${username}',{password}='${password}')`,
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
        const user = data.records[0]; // Если в ответе 1 запись - все ок

        setIsLoggedIn(true);
        console.log("✅ Logged-in user:", user);

        setCurrentUser({
          id: user.id, // ID пользователя из Airtable
          username: user.fields.username,
          role: user.fields.role, // Сохраняем роль пользователя
        });

        navigate("/app");
      } else if (data.records.length > 1) {
        console.error("⚠️ Unexpected multiple records found:", data.records);
        return setError("Multiple accounts found. Please check Airtable.");
      } else {
        return setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

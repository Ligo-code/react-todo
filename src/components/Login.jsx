import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import bcrypt from "bcryptjs";

function Login({ setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Очищаем ошибку перед запросом

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
      console.log("User data received:", data);

      if (!data.records || data.records.length === 0) {
        setError("Invalid username or password.");
        return;
      }

      const user = data.records[0];
      if (!user.fields || !user.fields.password || !user.fields.username || !user.fields.role) {
        setError("Invalid user data received.");
        return;
      }

      const hashedPassword = user.fields.password;

      if (bcrypt.compareSync(password, hashedPassword)) {
        const currentUser = {
          id: user.id,
          username: user.fields.username,
          role: user.fields.role,
        };

        console.log("User logged in:", currentUser);
        setIsLoggedIn(true);
        setCurrentUser(currentUser);
        navigate("/app");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

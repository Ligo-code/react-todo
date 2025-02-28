/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import bcrypt from "bcryptjs";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedRoles = ["parent", "child"];

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!username.trim() || !password.trim() || !role) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (!allowedRoles.includes(role)) {
      setError(`Invalid role selected: ${role}`);
      return;
    }

    // Хеширование пароля внутри функции
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
        console.error("Error response from Airtable:", errorData);
        throw new Error(errorData.error?.message || "Failed to register user.");
      }
  
      const data = await response.json();
      console.log("Registered user ID:", data.id);
  
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Failed to register user. Please try again.");
    }
  };
  
  return (
    <div className={styles.register}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="parent">parent</option>
          <option value="child">child</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
*/
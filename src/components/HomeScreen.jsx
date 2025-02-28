import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeScreen.module.css";

function HomeScreen() {
  return (
    <div className={styles.homeScreen}>
      <h1>Welcome to Chores App!</h1>
      <h2>Manage your household chores easily!</h2>
      <div className={styles.buttons}>
        <Link to="/register" className={styles.button}>
          Register
        </Link>
        <Link to="/login" className={styles.button}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;
import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeScreen.module.css";

function HomeScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Заголовок */}
        <h1 className={styles.title}>ChoreMaster</h1>
        <p className={styles.tagline}>Make Chores Fun & Organized</p>

        {/* Кнопки */}
        <div className={styles.buttonGroup}>
          <Link to="/register" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link to="/login" className={styles.secondaryButton}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;

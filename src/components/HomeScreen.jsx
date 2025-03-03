import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeScreen.module.css";

function HomeScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          ChoreMaster
          <div className={styles.subtitle}>Your Family's Task Hub</div>
        </h1>
        
        <div className={styles.description}>
          <p>Transform household responsibilities into a team effort</p>
          <p className={styles.perfectFor}>Perfect for:</p>
        </div>

        <ul className={styles.benefits}>
          <li>✅ Parents managing kids' chores</li>
          <li>✅ Teaching responsibility through tasks</li>
          <li>✅ Tracking progress in real-time</li>
        </ul>

        <div className={styles.buttonGroup}>
          <Link to="/register" className={styles.primaryButton}>
            Start Organizing Today
          </Link>
          <Link to="/login" className={styles.secondaryButton}>
            Returning User? Sign In
          </Link>
        </div>

        <p className={styles.note}>
          "Finally, a fair way to divide household work!" 
          <br />
          — Our Happy Families
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
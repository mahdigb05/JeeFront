import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const SignedOutLinks = () => {
  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/signin" className={styles.login}>
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={`btn btn-light ${styles["action-button"]}`}
      >
        Sign up
      </NavLink>
    </span>
  );
};

export default SignedOutLinks;

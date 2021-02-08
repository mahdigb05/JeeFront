import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const AdminLinks = (props) => {
  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/listcours" className={styles.login}>
        Emplois du temps
      </NavLink>
      <NavLink to="/satistiques" className={styles.login}>
        Cours
      </NavLink>
      <NavLink to="/tags" className={styles.login}>
        Services
      </NavLink>
      <Button
        href="/"
        shape="round"
        onClick={props.signOut}
        className={`btn btn-light ${styles["action-button"]}`}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(AdminLinks);

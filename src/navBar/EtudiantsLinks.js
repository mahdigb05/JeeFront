import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const EtudiantLinks = (props) => {
  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/listcours" className={styles.login}>
        Services
      </NavLink>
      <NavLink to="/satistiques" className={styles.login}>
        Cours
      </NavLink>
      <NavLink to="/tags" className={styles.login}>
        Notes et absences
      </NavLink>
      <NavLink to="/tags" className={styles.login}>
        Emplois du temps
      </NavLink>
      <Button
        href="/"
        onClick={props.signOut}
        shape="round"
        className={`btn btn-light ${styles["action-button"]}`}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(EtudiantLinks);

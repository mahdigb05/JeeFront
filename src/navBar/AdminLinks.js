import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const AdminLinks = ({history}) => {
  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    history.push("/");
  };

  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/gestionEdts" className={styles.login}>
        Emplois du temps
      </NavLink>
      <NavLink to="/cours" className={styles.login}>
        Cours
      </NavLink>
      <NavLink to="/services" className={styles.login}>
        Services
      </NavLink>
      <Button
        href="/"
        shape="round"
        type="primary"
        style={{ color: "white" }}
        onClick={deconnexion}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(AdminLinks);

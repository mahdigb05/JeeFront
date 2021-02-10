import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const ProfesseurLinks = ({history}) => {


  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email")
    history.push('/');
  }

  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/edts" className={styles.login}>
        Emplois du temps
      </NavLink>
      <NavLink to="/NoteAbsenceProf" className={styles.login}>
        Notes et absences
      </NavLink>
      <Button
        href="/"
        shape="round"
        onClick={deconnexion}
        type="primary"
        style={{color:"white"}}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(ProfesseurLinks);

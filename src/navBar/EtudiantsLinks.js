import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Button } from "antd";

const EtudiantLinks = ({history}) => {

  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email")
    history.push('/');
  }

  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/servicesEtudiant" className={styles.login}>
        Services
      </NavLink>
      <NavLink to="/consulterCours" className={styles.login}>
        Cours
      </NavLink>
      <NavLink to="/NotesAbsenceEtudiant" className={styles.login}>
        Notes et absences
      </NavLink>
      <NavLink to="/edts" className={styles.login}>
        Emplois du temps
      </NavLink>
      <Button
        href="/"
        onClick={deconnexion}
        shape="round"
        type="primary"
        style={{color:"white"}}
      >
        deconnexion
      </Button>
    </span>
  );
};

export default withRouter(EtudiantLinks);

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import AdminLinks from "./AdminLinks";
import ProfesseurLinks from "./ProfesseurLinks";
import EtudiantLinks from "./EtudiantsLinks";

const NavBar = () => {

  const role = localStorage.getItem("user_role");
  var links;
  if (role === "ROLE_ADMINISTRATEUR") links = <AdminLinks />;
  else if (role === "ROLE_PROFESSEUR") links = <ProfesseurLinks />;
  else links = <EtudiantLinks />;
  return (
    <nav
      className={`navbar navbar-light navbar-expand-md ${styles["navigation-clean-button"]}`}
    >
      <Link to="/" className={`navbar-brand ${styles.navbarBrand}`}>
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarMenu"
        aria-controls="navbarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarMenu"
      >
        {links}
      </div>
    </nav>
  );
};

export default NavBar;

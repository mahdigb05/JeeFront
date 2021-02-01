import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const auth = {
    uid : true
  }

  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
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


export default NavBar

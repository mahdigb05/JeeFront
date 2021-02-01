import React from "react";
import styles from "./Auth.module.css";

const LoginForm = () => {
  
    return (
      <div className={styles.content}>
        <form className={styles.formIn}>
          <div className={styles.illustration}>
            <i className="fas fa-user-lock"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              id="email"
              aria-describedby="email"
              placeholder="adresse email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              id="password"
              placeholder="mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-block ${styles.btnPrimary}`}
          >
            connexion
          </button>
          <br/>
          <a>s'inscrire</a>
        </form>
      </div>
    );
  }



export default LoginForm

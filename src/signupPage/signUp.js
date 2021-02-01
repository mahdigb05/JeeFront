import React from "react";
import styles from "../loginPage/Auth.module.css";

const SignUp = () => {
return (
      <div className={styles.content}>
        <form className={styles.formUp}>
          <h2 className="text-center">
            <strong>Créer</strong> votre compte
          </h2>
          <div className="form-group input-group">
            <input
              id="cin"
              className={`form-control ${styles.formControl}`}
              placeholder="cin"
              type="text"
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              id="nom"
              className={`form-control ${styles.formControl}`}
              placeholder="Nom"
              type="text"
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              id="prenom"
              className={`form-control ${styles.formControl}`}
              placeholder="Prenom"
              type="text"
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              id="email"
              className={`form-control ${styles.formControl}`}
              placeholder="adresse email"
              type="email"
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              className={`form-control ${styles.formControl}`}
              placeholder="mot de passe"
              type="password"
              id="password"
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              className={`form-control ${styles.formControl}`}
              placeholder="confirmer le mot de passe "
              type="password"
              required
            />
          </div>
          <div class="form-check row">
            <span className="col">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="etudiant" required />
              <label class="form-check-label" for="flexRadioDefault1">
                Etudiant         
              </label>
              </span>
              <span className ="col">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="enseignant" required />
              <label class="form-check-label" for="flexRadioDefault1">
                Enseignant
              </label>
              </span>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className={`btn btn-primary btn-block ${styles.btnPrimary}`}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    );
  }

export default SignUp;

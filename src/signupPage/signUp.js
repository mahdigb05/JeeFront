import axios from "axios";
import React, { useState } from "react";
import styles from "../loginPage/Auth.module.css";
import { message,Button } from "antd";

const SignUp = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("", { nom, prenom, tel, email, password, role });
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else message.error("le serveur est confronté à quelques problèmes");
    }
  };

  return (
    <div className={styles.content}>
      <form className={styles.formUp} onSubmit={handleSubmit}>
        <h2 className="text-center">
          <strong>Créer</strong> votre compte
        </h2>
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-group input-group">
          <input
            id="nom"
            className={`form-control ${styles.formControl}`}
            placeholder="Nom"
            type="text"
            required
            onChange={(value) => setNom(value)}
          />
        </div>
        <div className="form-group input-group">
          <input
            id="prenom"
            className={`form-control ${styles.formControl}`}
            placeholder="Prenom"
            type="text"
            required
            onChange={(value) => setPrenom(value)}
          />
        </div>
        <div className="form-group input-group">
          <input
            id="tel"
            className={`form-control ${styles.formControl}`}
            placeholder="tel"
            type="text"
            required
            onChange={(value) => setTel(value)}
          />
        </div>
        <div className="form-group input-group">
          <input
            id="email"
            className={`form-control ${styles.formControl}`}
            placeholder="adresse email"
            type="email"
            required
            onChange={(value) => setEmail(value)}
          />
        </div>
        <div className="form-group input-group">
          <input
            className={`form-control ${styles.formControl}`}
            placeholder="mot de passe"
            type="password"
            id="password"
            required
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div class="form-check row">
          <span className="col">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="etudiant"
              required
              value="ROLE_ETUDAINT"
              onChange={(value) => setRole(value)}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Etudiant
            </label>
          </span>
          <span className="col">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="enseignant"
              required
              value="ROLE_PROFESSEUR"
              onChange={(value) => setRole(value)}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Enseignant
            </label>
          </span>
        </div>
		<br/>
        <div className="form-group">
          <Button
            type="primary"
            block
			htmlType="submit"

			// className={`btn btn-primary btn-block ${styles.btnPrimary}`}
          >
            S'inscrire
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

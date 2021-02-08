import axios from "axios";
import React, { useState } from "react";
import styles from "./Auth.module.css";
import { message } from "antd";

const LoginForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    var payload = new FormData();
    payload.set("email", email);
    payload.set("password", password);

    try {
      const { data } = await axios.post("", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_role", data.role);
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
      <form className={styles.formIn} onSubmit={handleSubmit}>
        <div className={styles.illustration}>
          <i className="fas fa-user-lock"></i>
        </div>
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            id="email"
            aria-describedby="email"
            placeholder="adresse email"
            required
            onChange={(value) => setEmail(value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control ${styles.formControl}`}
            id="password"
            placeholder="mot de passe"
            required
            onChange={(value) => setPassword(value)}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-block ${styles.btnPrimary}`}
        >
          connexion
        </button>
        <br />
        <a>s'inscrire</a>
      </form>
    </div>
  );
};

export default LoginForm;

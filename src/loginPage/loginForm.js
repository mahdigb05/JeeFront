import axios from "axios";
import React, { useState } from "react";
import styles from "./Auth.module.css";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const LoginForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_role", response.data.role);
	  localStorage.setItem("user_email",response.data.email);
      if (localStorage.getItem("user_role") === "ROLE_ETUDIANT")
        history.push("/Semestres");
      else if (localStorage.getItem("user_role") === "ROLE_PROFESSEUR")
        history.push("/ModulesProf");
	else
		history.push("/cours")
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
      <form className={styles.formIn} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.illustration}>
          <UserOutlined />
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control ${styles.formControl}`}
            id="password"
            placeholder="mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-block ${styles.btnPrimary}`}
        >
          connexion
        </button>
        <br />
        <NavLink to='/inscription'>s'inscrire</NavLink>
      </form>
    </div>
  );
};

export default LoginForm;

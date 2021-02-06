const Form = () => {
    return(
        <div>
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
          <div className="form-group">
            <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
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
    )
}
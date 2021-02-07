import LoginForm from "./loginPage/loginForm";
import SignUp from "./signupPage/signUp";
import NavBar from "./navBar/NavBar";
import ListUsers from "./gestionUtilisateurs/gestionUtilisateur";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListServices from "./gestionServices/serviceList";
import ListCours from "./gestionCours/listCours";
import GlobalContextProvider from "./contexts/globalContext";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/inscription" component={SignUp} />
            <Route exact path="/navBar" component={NavBar} />
            <Route exact path="/users" component={ListUsers} />
            <Route exact path="/services" component={ListServices} />
            {/* <Route exact path="/modules" component={ModulesList} /> */}
            <Route exact path="/cours" component={ListCours} />
            {/* <Route exact path="/filieres" component={FilieresList} />
            <Route exact path="/demandesServices" component={ListServices} />
            <Route exact path="/addCours" component={CoursForm} /> */}
          </Switch>
        </BrowserRouter>
      </GlobalContextProvider>
    </div>
  );
}

export default App;

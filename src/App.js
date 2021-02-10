import LoginForm from "./loginPage/loginForm";
import SignUp from "./signupPage/signUp";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListService from "./gestionServices/listService";
import ListCours from "./gestionCours/listCours";
import GlobalContextProvider from "./contexts/globalContext";
import ListEdts from "./gestionEmploisTemps/emploisList";

import ListeModuleByEtudiant from './Module/ListeModuleByEtudiant';
import NoteAbsenceProf from "./NoteAbsence/NoteAbsenceProf";
import NoteAbsenceEtudiant from "./NoteAbsence/NoteAbsenceEtudiant";
import ConsulterEdt from './Edts/ConsulterEdt';
import ConsulterCours from './Cours/ConsulterCours';
import ListeModulesByProf from "./Module/ListeModulesByProf";
import ConsulterSemestres from "./Semestres/ConsulterSemestres";
import ListServiceEtudiant from "./gestionServicesEtudiant/listService"

import EdtContextProvider from './contexts/EdtContext';
import CoursContextProvider from './contexts/CoursContext';
import ModuleContextProvider from './contexts/ModuleContext';
import SemestresContextProvider from './contexts/SemestresContext';
import NoteAbsenceContextProvider from './contexts/NoteAbsenceContext';


function App() {
  return (
    <div className="App">
      <NoteAbsenceContextProvider>
        <EdtContextProvider>
          <SemestresContextProvider>
              <ModuleContextProvider>
                <CoursContextProvider>
                  <GlobalContextProvider>
                    <BrowserRouter>
                      <Switch>
                        <Route exact path="/" component={LoginForm} />
                        <Route exact path="/inscription" component={SignUp} />
                        <Route exact path="/servicesEtudiant" component={ListServiceEtudiant} />
                        <Route exact path="/cours" component={ListCours} />
                        <Route exact path="/gestionEdts" component={ListEdts} />
                        <Route exact path="/services" component={ListService} />
                        <Route exact path = '/NoteAbsenceProf' component = {NoteAbsenceProf}/>
                        <Route exact path = '/NotesAbsenceEtudiant' component = {NoteAbsenceEtudiant}/>
                        <Route exact path = '/edts' component = {ConsulterEdt}/>
                        <Route exact path = '/consulterCours' component = {ConsulterCours}/>
                        <Route exact path = '/ModulesProf' component = {ListeModulesByProf}/>
                        <Route exact path = '/ModulesEtudiant' component = {ListeModuleByEtudiant}/>
                        <Route exact path = '/Semestres' component = {ConsulterSemestres}/>
                      </Switch>
                    </BrowserRouter>
                  </GlobalContextProvider>
                </CoursContextProvider>
              </ModuleContextProvider>
          </SemestresContextProvider>
        </EdtContextProvider>
      </NoteAbsenceContextProvider>
    </div>
  );
}

export default App;

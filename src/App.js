import LoginForm from './loginPage/loginForm'
import SignUp from './signupPage/signUp'
import NavBar from './navBar/NavBar'
import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
								<Switch>
									<Route exact path='/' component={LoginForm} />
                  <Route exact path='/inscription' component={SignUp} />
                  <Route exact path='/navBar' component={NavBar} />
								</Switch>
		</BrowserRouter>
    </div>
  );
}

export default App;

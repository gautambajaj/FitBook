import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import RecipeSearch from './components/recipe-search/RecipeSearch'
import Recipes from './components/recipe-search/Recipes'

import './App.css';


// Check for jwt token
if(localStorage.jwtToken){
  // set auth token header
  setAuthToken(localStorage.jwtToken);

  // decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    // logout user
    store.dispatch(logoutUser());

    // clear current profile
    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/recipe-search" component={ RecipeSearch } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/recipe-search/results" component={ Recipes } />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;

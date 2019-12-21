import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import NavBar from "./components/navBar/NavBar";

import "./App.css";
import AddActivity from "./pages/addActivity/AddActivity";
import Leaderboards from "./pages/leaderboards/Leaderboards";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/:username" component={Profile} />
          <Route exact path="/newactivity" component={AddActivity} />
          <Route exact path="/leaderboards" component={Leaderboards} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

const App = ({ history }) => {
  const [auth, setAuth] = useState(new Auth(history));
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);

  useEffect(() => {
    auth.renewToken(() => {
      setTokenRenewalComplete(true);
    });
  }, []);

  return tokenRenewalComplete ? (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={(props) => <Home auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
        <PrivateRoute path="/profile" Component={Profile} />
        <Route path="/public" component={Public} />
        <PrivateRoute path="/private" Component={Private} />
        <PrivateRoute
          path="/courses"
          Component={Courses}
          scopes={["read:courses"]}
        />
      </div>
    </AuthContext.Provider>
  ) : (
    "Loading..."
  );
};

export default App;

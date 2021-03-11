import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";

const App = ({ history }) => {
  const auth = new Auth(history);
  return (
    <>
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
        <PrivateRoute path="/profile" Component={Profile} auth={auth} />
        <Route path="/public" component={Public} />
        <PrivateRoute path="/private" Component={Private} auth={auth} />
        <PrivateRoute
          path="/courses"
          Component={Courses}
          auth={auth}
          scopes={["read:courses"]}
        />
      </div>
    </>
  );
};

export default App;

import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ Component, auth, scopes, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuthenticated()) {
          return auth.login();
        }

        if (scopes && scopes.length && !auth.userHasScopes(scopes)) {
          return (
            <h1>
              Unauthorized - You need the following scope(s) to view this page:{" "}
              {scopes.join(",")}.
            </h1>
          );
        }

        return <Component auth={auth} {...props} />;
      }}
    />
  );
};

export default PrivateRoute;

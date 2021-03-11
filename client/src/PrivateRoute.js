import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ Component, scopes, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Route
          {...rest}
          render={(props) => {
            if (!auth.isAuthenticated()) {
              return auth.login();
            }

            if (scopes && scopes.length && !auth.userHasScopes(scopes)) {
              return (
                <h1>
                  Unauthorized - You need the following scope(s) to view this
                  page: {scopes.join(",")}.
                </h1>
              );
            }

            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;

import React, { useEffect } from "react";

const Callback = ({ location, auth }) => {
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }, []);

  return <h1>Loading...</h1>;
};

export default Callback;

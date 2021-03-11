import React, { useState, useEffect } from "react";

const Private = ({ auth }) => {
  const [message, setMessage] = useState("");
  const { getAccessToken } = auth;

  useEffect(() => {
    fetch("/private", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((response) => setMessage(response.message))
      .catch((error) => setMessage(error.error));
  });

  return <p>{message}</p>;
};

export default Private;

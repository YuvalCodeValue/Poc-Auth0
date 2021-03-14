import React, { useState, useEffect } from "react";

const Private = ({ auth }) => {
  const [message, setMessage] = useState([]);
  const { getAccessToken } = auth;

  useEffect(() => {
    fetch("http://localhost:7000/private", {
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
      .then((response) => setMessage(response))
      .catch((error) => setMessage(error));
  }, []);

  if (!message.message) {
    return (
      <div>
        {message.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    );
  } else {
    return <div>{message.message}</div>;
  }
};

export default Private;

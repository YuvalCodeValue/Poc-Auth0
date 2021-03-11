import React, { useState, useEffect } from "react";

const Public = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((response) => setMessage(response))
      .catch((error) => {
        console.log(error.toString());
        setMessage(error.error);
      });
  }, []);

  return (
    <div>
      {message.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default Public;

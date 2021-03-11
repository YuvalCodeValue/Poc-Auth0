import React, { useState, useEffect } from "react";

const Courses = ({ auth }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const { getAccessToken } = auth;

  useEffect(() => {
    fetch("/course", {
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
      .then((response) => setCourses(response.courses))
      .catch((error) => setError(error.error));

      fetch("/admin", {
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
        .then((response) => console.log(response))
        .catch((error) => setError(error.error));
  }, []);

  return error ? (
    <p>{error}</p>
  ) : (
    <ul>
      {courses.map((course) => {
        return <li key={course.id}>{course.title}</li>;
      })}
    </ul>
  );
};

export default Courses;

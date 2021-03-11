import express from "express";
import dotenv from "dotenv";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import checkScope from "express-jwt-authz";

dotenv.config();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/public", (req, res) => {
  res.json({
    message: "Hello from a public API!",
  });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "Hello from a private API!",
  });
});

const checkRole = (role) => {
  return (req, res, next) => {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
};

app.get("/course", checkJwt, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components " },
    ],
  });
});

app.get("/admin", checkJwt, checkRole("admin"), (req, res) => {
  res.json({
    message: "Hello from a admin API!",
  });
});

app.listen(7000);
console.log("API server listening on" + process.env.REACT_APP_API_URL);

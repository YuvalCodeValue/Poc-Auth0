// import express from "express";
// import dotenv from "dotenv";
// import jwt from "express-jwt";
// import jwksRsa from "jwks-rsa";

// dotenv.config();

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }),
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
//   algorithms: ["RS256"],
// });
// const app = express();

// app.get("/public", (req, res) => {
//   res.json({
//     message: "Hello from a public API!",
//   });
// });

// app.get("/private", checkJwt, (req, res) => {
//   res.json({
//     message: "Hello from a private API!",
//   });
// });

// app.listen(3001);
// console.log("API server listening on" + process.env.REACT_APP_API_URL);

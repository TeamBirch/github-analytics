const express = require("express");
const app = express();
const config = require("./config.js"); // For the github key and secret
const path = require("path");

const port = process.env.PORT || 3000;

// ================================================
// Github OAUTH ROUTES! IMPORTANT!!!
// ================================================

const githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_KEY,
  githubSecret: config.GITHUB_SECRET,
  baseURL: 'https://localhost:' + port,
  loginURI: '/login',
  callbackURI: '/repos'
});

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

// Login Route
app.get("/login", (req, res) => {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/repos", (req, res) => {
  console.log("received callback");
  return githubOAuth.callback(req, res);
});

githubOAuth.on("error", (err) => {
  console.error("there was a login error", err);
});

githubOAuth.on("token", (token, serverResponse) => {
  serverResponse.end(JSON.stringify(token));
});

app.listen(port, () => console.log(`Server is running at ${port}`));

const express = require('express');
const app = express();
const config = require("./config.js") // For the github key and secret
const path = require('path');

const port = process.env.PORT || 8080;

// ================================================
// Github OAUTH ROUTES! IMPORTANT!!!
// ================================================

const githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_KEY,
  githubSecret: config.GITHUB_SECRET,
  // baseURL: 'http://localhost:' + port, // For none cloud 9 users
  baseURL: 'https://codesmith-rhythmmagi.c9users.io/',
  loginURI: '/login',
  callbackURI: '/repos'
});

app.get("/login", (req, res) => {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/repos", (req, res) => {
  console.log("received callback");
  return githubOAuth.callback(req, res); 
});

githubOAuth.on('error', (err) => {
  console.error('there was a login error', err);
});

githubOAuth.on('token', (token, serverResponse) => {
  serverResponse.end(JSON.stringify(token));
});

// ===================================================

// TEST ROUTES 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});

app.listen(port, () => console.log(`Server is running at ${port}`));
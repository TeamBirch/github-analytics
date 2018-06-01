const express = require('express');
const app = express();
const config = require("./config.js") // For the github key and secret

const port = process.env.PORT || 8080;
// ================================================
// Github OAUTH ROUTES! IMPORTANT!!!
// ================================================

const githubOAuth = require('github-oauth')({
  githubClient: config.GITHUB_KEY,
  githubSecret: config.GITHUB_SECRET,
  // baseURL: 'http://localhost:' + port,
  baseURL: 'https://codesmith-rhythmmagi.c9users.io/',
  loginURI: '/auth/github',
  callbackURI: '/repos'
});

app.get("/auth/github", (req, res) => {
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
  console.log('here is your shiny new github oauth token', token);
  serverResponse.end(JSON.stringify(token));
});

// ===================================================

// TEST ROUTES 

app.get('/', (req, res) => {
    res.render('./views/test.html')
});


app.listen(port, () => console.log(`Server is running at ${port}`));
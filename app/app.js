const express = require("express");
const app = express();

const { 
    getEndpoints,
    getTopics
 } = require("./controller");

const { 
    invalidMethod,
    invalidEndpoint, 
    serverError,
    iAmATeapot 
} = require("./error-handling");


app.get("/api", getEndpoints);
app.get("/api/teapot", iAmATeapot);
app.route("/api/topics")
  .get(getTopics)
  .all(invalidMethod);

app.use(invalidEndpoint);
app.use(serverError);

module.exports = app
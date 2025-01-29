const express = require("express");
const app = express();

const { 
    getEndpoints,
    getTopics,
    getArticleById
 } = require("./controllers/controller");

const { 
    invalidMethod,
    invalidEndpoint, 
    serverError,  
    iAmATeapot,
    MiddleWareErrors
} = require("./error-handlers/error-handling");


app.get("/api", getEndpoints);
app.get("/api/teapot", iAmATeapot);
app.route("/api/topics")
  .get(getTopics)
  .all(invalidMethod);
app.get("/api/articles/:article_id", getArticleById)
app.all("/*", invalidEndpoint)

// error handling middleware \/
app.use(MiddleWareErrors)
app.use(serverError);

module.exports = app
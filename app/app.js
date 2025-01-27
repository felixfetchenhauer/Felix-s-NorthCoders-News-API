const express = require("express");
const app = express();
const db = require("../db/connection")
const endpointsJSON = require("../endpoints.json")

// Middleware to handle JSON responses
app.use(express.json());

app.get("/api", (req, res, next) => {
    console.log(endpointsJSON)
    res.status(200).send({endpoints: endpointsJSON})
})

module.exports = app
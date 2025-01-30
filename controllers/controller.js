const endpointsJSON = require("../endpoints.json");
const { 
    selectTopics,
    selectArticleById,
    selectArticles
    } = require("../models/model");

exports.getEndpoints = (req, res) => {
    res.status(200).send({endpoints: endpointsJSON})
}

exports.getTopics = (req, res) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
}   

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params
    if (isNaN(Number(article_id))) {
        return res.status(400).send({msg: "article_id is not a number"})
    }
    selectArticleById(article_id)
    .then((article) => {
    res.status(200).send({article})
    })
    .catch(next)
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send({articles})
    })
}
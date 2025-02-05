const endpointsJSON = require("../endpoints.json");
const { 
    selectTopics,
    selectArticleById,
    selectArticles,
    selectCommentsFromArticle,
    checkIfArticleExists
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
        return res.status(400).send({msg: "Bad Request"})
    }
    selectArticleById(article_id)
    .then((article) => {
    res.status(200).send({article})
    })
    .catch(next)
}

exports.getArticles = (req, res) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send({articles})
    })
}

exports.getCommentsFromArticle = (req, res, next) => {
    const { article_id } = req.params;
    
    if (isNaN(Number(article_id))) {
        return res.status(400).send({ msg: "Bad Request" });
    }   
    checkIfArticleExists(article_id)
        .then((article) => {
            console.log(article.rows)
            if (article.rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not Found" });
            }
            return selectCommentsFromArticle(article_id)
        })
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch(next);
};

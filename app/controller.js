const endpointsJSON = require("../endpoints.json");
const { selectTopics } = require("./model");

exports.getEndpoints = (req, res, next) => {
    res.status(200).send({endpoints: endpointsJSON})
}

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
}   
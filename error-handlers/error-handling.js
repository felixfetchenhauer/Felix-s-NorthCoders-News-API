exports.invalidMethod = (req, res, next) => {
    res.status(405).send({ msg: "Method Not Allowed" });
}

exports.iAmATeapot = (req, res, next) => {
    res.status(418).send({msg: "Yorkshire tea only :)"})
}

exports.invalidEndpoint = (req, res, next) => {
    res.status(404).send({msg: "Not Found"})
};

exports.MiddleWareErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.serverError = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({msg: "Internal Server Error"})
};
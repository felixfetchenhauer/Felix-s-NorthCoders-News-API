exports.invalidMethod = (req, res, next) => {
    res.status(405).send({ msg: "Method Not Allowed" });
  }

exports.iAmATeapot = (req, res, next) => {
    res.status(418).send({msg: "Yorkshire tea only :)"})
}

exports.invalidEndpoint = ((req, res, next) => {
    res.status(404).send({msg: "Not Found"})
});

exports.serverError = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({msg: "Internal Server Error"})
};
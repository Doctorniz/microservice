function timestamp(req, res) {
    console.log(req.params.input)
    res.send("hello");
}

module.exports = timestamp;


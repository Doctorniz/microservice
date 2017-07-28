const express = require('express');
const router = express.Router();
//const microservice = require('../controllers/microservice');

router.get('/', function (req, res) {
    res.send('Hello World motherfuucker');
});



module.exports = router;
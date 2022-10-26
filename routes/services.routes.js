const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('patient/services/all-services');
});



module.exports = router;
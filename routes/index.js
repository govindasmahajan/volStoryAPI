var express = require('express');
var router = express.Router();
const config = require('../config/config');

(function (tenant) {
    if (tenant && tenant.name) {
        try {
            require(`./${tenant.name}`)(router);
        } catch (e) {
            console.log(e);
        }
    }
})(config.tenant);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Bot Analytics' });
});


module.exports = router


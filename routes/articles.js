var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/id', function(req, res, next) {

});
router.patch('/', function(req, res, next) {

});
router.post('/', function(req, res, next) {

});
router.delete('/id', function(req, res, next) {

});


module.exports = router;
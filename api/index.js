const router = require('express').Router();
const article = require('./article/articleRoute');

router.use('/article', article);

module.exports = router;

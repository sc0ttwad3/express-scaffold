var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('-----------------------------------')
  console.log('Inside the homepage router function');
  console.log(req.sessionID);
  res.render('index', { title: 'Express', session: req.sessionID });
});

module.exports = router;

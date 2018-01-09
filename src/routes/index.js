const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('-----------------------------------')
  console.log('Inside the homepage router function');
  console.log(req.sessionID);
  res.render('index', { title: 'Express-Scaffold', session: req.sessionID });
});

module.exports = router;

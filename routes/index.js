var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // call scrapped data
  res.json({ hello: true });
});

module.exports = router;

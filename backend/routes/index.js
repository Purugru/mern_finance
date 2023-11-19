const router = require("express").Router();

const { test } = require("../controller/index");

router.route("/").get(test);

module.exports = router;

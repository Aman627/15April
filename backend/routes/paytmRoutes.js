const express = require("express");
const router = express.Router();
const { getPaytmConfig } = require("../controllers/paytmController");

router.route("/config").get(getPaytmConfig);
// router.route("/config").post();

module.exports = router;

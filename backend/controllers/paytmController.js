const asyncHandler = require("express-async-handler");
const Paytm = require("paytmchecksum");
// @desc Fetch paytm config
// @route GET /api/paytm/config
// @access public
const getPaytmConfig = asyncHandler(async (req, res) => {
  res.json({
    PAYTM_HOST: process.env.PAYTM_HOST,
    PAYTM_MID: process.env.PAYTM_MID,
  });
});

module.exports = {
  getPaytmConfig,
};

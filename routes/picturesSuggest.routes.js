const express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.get("/pictures/:input", (req, res, next) => {
  axios
    .get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API}&q=${req.params.input}&image_type=photo`
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
});

module.exports = router;

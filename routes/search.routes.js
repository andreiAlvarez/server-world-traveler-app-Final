const express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.get("/searchplace/:input", (req, res, next) => {
    axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.input}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`
      ).then(response => {
          console.log(response.data);
          res.json(response.data)
      })
});

module.exports = router;

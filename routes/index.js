const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longURL);
    } else {
      return res.status(404).json("URL not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

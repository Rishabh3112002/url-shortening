const express = require("express");
const router = express.Router();
const validURL = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { longURL } = req.body;
  const baseURL = config.get("baseurl");

  if (!validURL.isUri(baseURL)) {
    return res.status(401).json("URL not valid");
  }
  const urlCode = shortid.generate();

  if (validURL.isUri(longURL)) {
    try {
      let url = await Url.findOne({ longURL });

      if (url) {
        res.json(url);
      } else {
        shortURL = `${baseURL}/${urlCode}`;
        url = new Url({
          longURL,
          shortURL,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error!");
    }
    
  } else {
    res.status(401).json("Invalid longURL");
  }
});

module.exports = router;

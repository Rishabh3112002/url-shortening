"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const validURL = require("valid-url");
const app = express();
const port = 3001;
const connectDB = require("./config/db")

// DB Connection
connectDB()

app.use(bodyParser.json());

app.use('/', require("./routes/index"));
app.use('/api/url', require("./routes/url"));

app.listen(port, () => {
  console.log(`app listening to http://localhost:${port}`);
});

// require depencies
const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
// const axios = require('axios');
// const cheerio = require('cheerio');

let db = require("./models");

let PORT = process.env.PORT || 3000;

let app = express();
// Set up Router
let router = express.Router();

require("./routes/commentApi.js")(router);
require("./routes/htmlRoutes.js")(router);
require("./routes/scrapeRoutes.js")(router);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI , { useNewUrlParser: true }, function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log("mongoose successful connection")
    };
});
mongoose.set('useCreateIndex', true);
app.use(router);

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});

// require depencies
const mongoose = require('mongoose');
const express = require("express");
const exphbs = require('express-handlebars')
// Scraping tools
const axios = require('axios');
const cheerio = require('cheerio');

let PORT = process.env.PORT || 3000;

let app = express();

let routes = require('./routes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.endgine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});

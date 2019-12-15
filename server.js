let mongoose = require('mongoose');
let express = require("express");
let exphbs = require('express-handlebars');
let methodOverride = require("method-override");
let path = require('path');
let logger = require('morgan');


// Scraping tools
let axios = require('axios');
let cheerio = require('cheerio');
let request = require('request');

let note = require ('./models/note');
let article = require ('./models.article')

mongoose.Promise = Promise;

const PORT = process.env.PORT || 3000;

let app = express();


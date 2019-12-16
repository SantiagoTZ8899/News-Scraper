let db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (router) {
    // GET route for scraping a website
    router.get("/api/scrape", function(req, res) {
        // get the body from the html with axios
        axios.get("https://www.latimes.com").then(function(response){
            let $ = cheerio.load(response.data);
            let storyCount = 0;
            $("div.PromoSmall-content").each(function(i, element) {
                let result = {};
                storyCount++;
                if (storyCount > 20) {
                    return false;
                };
            })
        })
    })
}
let db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (router) {
    // GET route for scraping a website
    router.get("/api/scrape", function(req, res) {
        // get the body from the html with axios
        axios.get("https://www.latimes.com").then(function(response){
        // axios.get("https://www.ign.com").then(function(response){

            let $ = cheerio.load(response.data);
            let storyCount = 0;
            $("div.PromoSmall-content").each(function() {
               
                let result = {};
                console.log(result)
                storyCount++;
                if (storyCount > 20) {
                    return false;
                };

                // let headline = $(element).find('span.jsx-1350539171 item-title-link').text();
                // console.log(storyCount, headline);
                // let summary = $(element).find('div.jsx-1350539171').text();
                // console.log(summary);
                // let link = $(element).find('div.jsx-1350539171 item-details a').attr('href');
                // console.log(link);
                // let storyDate = $(element).find('h3.jsx-1350539171 item-data').attr('data-timeago');
                // console.log(storyDate);

                // var headline = $(element).find('div.PromoSmall-title a').text();
                // var summary = $(element).find('div.PromoSmall-description').text();
                // var link = $(element).find('div.PromoSmall-title a').attr('href');
                // var storyDate = $(element).find('div.PromoSmall-timestamp').attr('data-date');

                if (headline && summary && link && storyDate) {
                    result.headline = headline;
                    result.summary = summary;
                    result.link = link;
                    result.storyDate = storyDate;

                    db.Story.create(result)
                        .then(function(dbStory) {
                            console.log(dbStory);
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                };
                
            });
            res.send("Scrape Complete");
        });
    });
};
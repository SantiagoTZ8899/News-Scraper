let db = require("../models");

module.exports = function (router) {
    router.get("/", function(req, res) {
        // get all news stories from db
        db.Story.find({}).sort({ '_id': -1 })
        .then(function(dbStory) {
            let hbsObject = {
                stories: dbStory
            };
            res.render("home", hbsObject);
        })
        .catch(function(err) {
        });
    });
};
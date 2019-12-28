let db = require("../models");

module.exports = function (router) {
    // route to get comments for a story
    router.get("/api/storyComment/:id", function(req, res) {
        db.Comment.find({_storyId: req.params.id})
            .then(function(dbComments) {
                res.json(dbComments)
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // route to delete a comment
    router.delete("/api/storyComment/:id", function(req, res) {
        db.Comment.deleteOne({_id: req.params.id},)
        .then(function(deleteResult) {
            res(deleteResult);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // route for saving a comment
    router.post("/api/storyComment", function(req, res) {
        db.Comment.create(req.body)
        .then(function(dbComment) {
            res.json(dbComment);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

};
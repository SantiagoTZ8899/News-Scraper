const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let StorySchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    storyDate: {
        type: String,
        required: true
    }
});

let Story = mongoose.model("Story", StorySchema);

module.exports = Story;
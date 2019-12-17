const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let CommentSchema = new Schema({
    _storyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Story'
    },
    body: String
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
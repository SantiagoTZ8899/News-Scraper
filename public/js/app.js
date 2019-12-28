$(function() {
    function getComments(storyId, endOfStoryElem) {
        $.ajax(`/api/storyComments/${storyId}`, {
            type: "GET"
        }).then(res => {
            res.map(comment => {
                delBtn = $(`<button class="btn btn-danger btn-sm comment-del-btn comment-dispose" data-comment-id="${comment._id}">Delete</button>`);
                endOfStoryElem.append(`<p class="story-comment comment-dispose" data-story-id="${storyId}" data-comment-id="${comment._id}"><span></>${comment.body}`);
                let spanTarget = $(".story-comment:last span");
                spanTarget.prepend(delBtn);
            });
            
            // render comment form
            endOfStoryElem.append(`<div>`);
            endOfStoryElem.append(`<button class="btn btn-success btn-sm add-comment-btn comment-dispose" data-story-id="${storyId}">Add</buttong>`);
            endOfStoryElem.append(`<textarea class="add-comment-input comment-dispose" name='body' data-story-id="${storyId}"></textarea>`);
        }
    );
    };

    // click event to re-scrape for more stories
    $("#re-scrape").on("click", function(event) {
        $.ajax("/api/scrape", {
            type: "GET"
        }).then(
            function() {
                location.reload();
            }
        );
    });

    // comment click event
    $(".comment-btn").on("click", function(event) {
        let storyId = $(this).data("story-id");
        let endOfStoryElem = $(this).prev();

        let activeComments = $(`[data-story-id="${storyId}"]:not(.comment-btn)`).length;
        $(".comment-dispose").remove();

        if (!activeComments) {
            getComments(storyId, endOfStoryElem);
        };
    });
    
    // delete a comment from a story through a click event
    $(document).on("click", ".comment-del-btn", function() {
        let commentId = $(this).data("comment-id");
        $.ajax(`/api/storyComment/${commentId}`, {
            type: "DELETE"
        }).then(
            function() {
                $(`.storyComment[data-comment-id="${commentId}"]`).remove();
            }
        );
    });

    // add a comment through a click event
    $(document).on("click", ".add-comment-btn", function() {
        let storyId =$(this).data("story-id");
        let commentText = $(".add-comment-input").val().trim();
        if (!commentText) {
            $('#empty-comment-text-box-modal').modal('show');
        } else {
            let storyId = $(this).data("story-id");
            let endOfStoryElem = $(this).prev();
            let comment = {
                _storyId: storyId,
                body: commentText
            };

            // call ADD route
            $.ajax(`/api/storyComment/`, {
                type: "POST",
                data: comment
            }).then(
                function(dbComment) {
                    delBtn = $(`button class="btn btn-danger btn-sm comment-del-btn comment-dispose" data-comment-id="${dbComment._id}">Delete</button>`);
                    endOfStoryElem.append(`<p class="story-comment comment-dispose" data-story-id="${dbComment._storyId}" data-comment-id="${dbComment._id}"><span></>${dbComment.body}`);
                    let spanTarget = $(".story-comment:last span");
                    spanTarget.prepend(delBtn);
                    $(".add-comment-input").val('');
                }
            );
            };
    });

});
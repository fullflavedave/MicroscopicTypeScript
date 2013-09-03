Template.postPage.helpers({
    currentPost: function () {
        return Models.Posts.findOne(Session.get('currentPostId'));
    },
    comments: function () {
        return Models.Comments.find({ postId: this._id });
    }
});

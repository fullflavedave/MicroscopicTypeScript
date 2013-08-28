Template.postPage.helpers({
    currentPost: function () {
        return PostsModel.Posts.findOne(Session.get('currentPostId'));
    },
    comments: function () {
        return CommentsModel.Comments.find({ postId: this._id });
    }
});
//@ sourceMappingURL=post_page.js.map

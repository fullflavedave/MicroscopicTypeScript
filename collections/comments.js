var CommentsModel;
(function (CommentsModel) {
    CommentsModel.Comments = new Meteor.Collection('comments');
})(CommentsModel || (CommentsModel = {}));
;

Meteor.methods({
    insertComment: function (commentAttributes) {
        var user = Meteor.user();
        var post = PostsModel.Posts.findOne(commentAttributes.postId);

        if (!user)
            throw new Meteor.Error(401, "You need to login to make comments");

        if (!commentAttributes.body)
            throw new Meteor.Error(422, 'Please write some content');

        if (!commentAttributes.postId)
            throw new Meteor.Error(422, 'You must comment on a post');

        var comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        PostsModel.Posts.update(comment.postId, { $inc: { commentsCount: 1 } });

        comment._id = CommentsModel.Comments.insert(comment);

        NotificationsModel.createCommentNotification(comment);

        return comment._id;
    }
});

;

this.CommentsModel = CommentsModel;
//@ sourceMappingURL=comments.js.map

var Model;
(function (Model) {
    Model.Comments = new Meteor.Collection('comments');
})(Model || (Model = {}));
;

Meteor.methods({
    insertComment: function (commentAttributes) {
        var user = Meteor.user();
        var post = Model.Posts.findOne(commentAttributes.postId);

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

        Model.Posts.update(comment.postId, { $inc: { commentsCount: 1 } });

        comment._id = Model.Comments.insert(comment);

        Model.createCommentNotification(comment);

        return comment._id;
    }
});

;

this.Model = Model;
//@ sourceMappingURL=comments.js.map

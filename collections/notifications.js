var Model;
(function (Model) {
    Model.Notifications = new Meteor.Collection('notifications');

    var docPermissions = new Permissions.DocPermissions();

    Model.Notifications.allow({
        update: docPermissions.ownsDocument
    });

    Model.createCommentNotification = function (comment) {
        var post = Model.Posts.findOne(comment.postId);
        Model.Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    };
})(Model || (Model = {}));

this.Model = Model;
//@ sourceMappingURL=notifications.js.map

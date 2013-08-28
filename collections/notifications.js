var NotificationsModel;
(function (NotificationsModel) {
    NotificationsModel.Notifications = new Meteor.Collection('notifications');

    NotificationsModel.Notifications.allow({
        update: Permissions.ownsDocument
    });

    NotificationsModel.createCommentNotification = function (comment) {
        var post = PostsModel.Posts.findOne(comment.postId);
        NotificationsModel.Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    };
})(NotificationsModel || (NotificationsModel = {}));

this.NotificationsModel = NotificationsModel;
//@ sourceMappingURL=notifications.js.map

var Models;
(function (Models) {
    Models.Posts = new Meteor.Collection('posts');
    Models.Comments = new Meteor.Collection('comments');
    Models.Notifications = new Meteor.Collection('notifications');

    Models.createCommentNotification = function (comment) {
        var post = Models.Posts.findOne(comment.postId);
        Models.Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    };
})(Models || (Models = {}));

this.Models = Models;

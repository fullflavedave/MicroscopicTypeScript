Meteor.publish('newPosts', function (limit) {
    return PostsModel.Posts.find({}, { sort: { submitted: -1 }, limit: limit });
});

Meteor.publish('bestPosts', function (limit) {
    return PostsModel.Posts.find({}, { sort: { votes: -1, submitted: -1 }, limit: limit });
});

Meteor.publish('singlePost', function (id) {
    return id && PostsModel.Posts.find(id);
});

Meteor.publish('comments', function (postId) {
    return CommentsModel.Comments.find({ postId: postId });
});

Meteor.publish('notifications', function () {
    return NotificationsModel.Notifications.find({ userId: this.userId });
});

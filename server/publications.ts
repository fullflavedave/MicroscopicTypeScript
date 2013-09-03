/// <reference path="../collections/posts.ts" />
/// <reference path="../collections/models.ts" />

Meteor.publish('newPosts', function (limit) {
  return Models.Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function (limit) {
  return Models.Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('singlePost', function (id) {
  return id && Models.Posts.find(id);
});

Meteor.publish('comments', function (postId) {
  return Models.Comments.find({postId: postId});
});

Meteor.publish('notifications', function () {
  return Models.Notifications.find({userId: this.userId});
});




/// <reference path="../collections/posts.ts" />
/// <reference path="../collections/comments.ts" />
/// <reference path="../collections/notifications.ts" />


//module Server {

  Meteor.publish('newPosts', function (limit) {
    return Model.Posts.find({}, {sort: {submitted: -1}, limit: limit});
  });

  Meteor.publish('bestPosts', function (limit) {
    return Model.Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
  });

  Meteor.publish('singlePost', function (id) {
    return id && Model.Posts.find(id);
  });
  /*
  Meteor.publish('comments', function (postId) {
    return Model.Comments.find({postId: postId});
  });

  Meteor.publish('notifications', function () {
    return Model.Notifications.find({userId: this.userId});
  });
  */

//};

//this.Server = Server;
/// <reference path='../lib/permissions.ts'/>
/// <reference path='posts.ts'/>
/// <reference path='../lib/typescript/meteor-typed-0.6.4.1.d.ts'>

module NotificationsModel {

  export var Notifications = new Meteor.Collection('notifications');

  NotificationsModel.Notifications.allow({
    update: Permissions.ownsDocument
  });

  export var createCommentNotification = function (comment) {
    var post = PostsModel.Posts.findOne(comment.postId);
    NotificationsModel.Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  };

}

this.NotificationsModel = NotificationsModel;

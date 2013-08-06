/// <reference path='../lib/permissions.ts'/>
/// <reference path='posts.ts'/>
/// <reference path='../lib/typescript/meteor-typed-0.6.4.1.d.ts'>

module Model {

  export var Notifications = new Meteor.Collection('notifications');

  var docPermissions = new Permissions.DocPermissions();

  Model.Notifications.allow({
    update: docPermissions.ownsDocument
  });

  export var createCommentNotification = function (comment) {
    var post = Model.Posts.findOne(comment.postId);
    Model.Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  };

}

this.Model = Model;
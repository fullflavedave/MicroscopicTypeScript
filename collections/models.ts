/// <reference path='../lib/typescript/meteor.d.ts'/>

module Models {
  export var Posts = new Meteor.Collection('posts');
  export var Comments = new Meteor.Collection('comments');
  export var Notifications = new Meteor.Collection('notifications');

  export var createCommentNotification = function (comment) {
    var post = Posts.findOne(comment.postId);
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  };

}

this.Models = Models;

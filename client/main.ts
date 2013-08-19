/// <reference path='../lib/typescript/meteor.d.ts'/>

module Handles {
  export var newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
  export var bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);
}

Deps.autorun(function () {
  Meteor.subscribe('singlePost', Session.get('currentPostId'));

  Meteor.subscribe('comments', Session.get('currentPostId'));
});

Meteor.subscribe('notifications');

this.Handles = Handles;
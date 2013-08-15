/// <reference path='../../../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>
/// <reference path='../../../lib/typescript/template-types.d.ts'/>
/// <reference path='../../../collections/posts.ts'/>
/// <reference path='../../main.ts'/>

Template.newPosts.helpers({
  options: function () {
    return {
      sort: {submitted: -1},
      handle: Handles.newPostsHandle
    }
  }
});

Template.bestPosts.helpers({
  options: function () {
    return {
      sort: {votes: -1, submitted: -1},
      handle: Handles.bestPostsHandle
    }
  }
});

Template.postsList.helpers({
  postsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    return PostsModel.Posts.find({}, options).map(function(post) {
      post._rank = i;
      i += 1;
      return post;
    });
  },
  posts: function () {
    return PostsModel.Posts.find({}, {sort: this.sort, limit: this.handle.limit()});
  },
  postsReady: function () {
    return this.handle.ready();
  },
  allPostsLoaded: function () {
    return this.handle.ready() && PostsModel.Posts.find().count() < this.handle.loaded();
  } });

Template.postsList.events({
  'click .load-more': function (event) {
    event.preventDefault();
    this.handle.loadNextPage();
  }
});
Template.newPosts.helpers({
  options: function () {
    return {
      sort: {submitted: -1},
      handle: newPostsHandle
    }
  }
});

Template.bestPosts.helpers({
  options: function () {
    return {
      sort: {votes: -1, submitted: -1},
      handle: bestPostsHandle
    }
  }
});

Template.postsList.helpers({
  posts: function () {
    return Posts.find({}, {sort: this.sort, limit: this.handle.limit()});
  },
  postsReady: function () {
    return this.handle.ready();
  },
  allPostsLoaded: function () {
    return this.handle.ready() && Posts.find().count() < this.handle.loaded();
  } });

Template.postsList.events({
  'click .load-more': function (event) {
    event.preventDefault();
    this.handle.loadNextPage();
  }
});
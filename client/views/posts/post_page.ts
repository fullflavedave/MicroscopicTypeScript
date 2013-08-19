/// <reference path='../../../lib/typescript/meteor.d.ts'/>
/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../collections/posts.ts'/>
/// <reference path='../../../collections/comments.ts'/>

Template.postPage.helpers({
  currentPost: function () {
    return PostsModel.Posts.findOne(Session.get('currentPostId'));
  },
  comments: function() {
    return CommentsModel.Comments.find({postId: this._id});
  }
});
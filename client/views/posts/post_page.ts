/// <reference path='../../../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>
/// <reference path='../../../lib/typescript/template-types.d.ts'/>
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
/// <reference path='../../../lib/typescript/meteor.d.ts'/>
/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../collections/models.ts'/>

Template.postPage.helpers({
  currentPost: function () {
    return Models.Posts.findOne(Session.get('currentPostId'));
  },
  comments: function() {
    return Models.Comments.find({postId: this._id});
  }
});
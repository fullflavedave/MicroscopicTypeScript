/// <reference path='../lib/typescript/underscore-typed-1.4.3.d.ts'/>
/// <reference path='../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>
/// <reference path='../lib/permissions.ts'/>

module Model {
  export var Posts = new Meteor.Collection('posts');
};

Meteor.methods({
  insertPost: function (postAttributes) {

    var user = Meteor.user(), postWithSameLink = Model.Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var postId = Model.Posts.insert(post);

    return postId;
  },

  upvote: function (postId) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    Model.Posts.update({
      _id: postId,
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});

this.Model = Model;
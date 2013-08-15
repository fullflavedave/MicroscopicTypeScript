/// <reference path='../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>
/// <reference path='../lib/typescript/underscore-typed-1.4.3.d.ts'/>
/// <reference path='../lib/permissions.ts'/>


module PostsModel {
  export var Posts = new Meteor.Collection('posts');
};

PostsModel.Posts.deny({
  update: function (userId, post, fieldNames) {
    // may only edit the following three fields:
    return (_.without(fieldNames, 'url', 'title', 'message').length > 0);
  }
});

/* This validation won't work b/c it appears that the values in post are
 the values from Mongo, not from the form

PostsModel.Posts.deny({
  update: function(userId, post, fieldNames) {

     if (!post.title) {
       throw new Meteor.Error(422, 'Please fill in a title');
     }

     var postWithSameLink = Posts.findOne({url: post.url});

     if (post.url && postWithSameLink) {
       throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
     }

  }
});
*/

PostsModel.Posts.allow({
  update: Permissions.ownsDocument,
  remove: Permissions.ownsDocument
})

Meteor.methods({
  insertPost: function (postAttributes) {

    var user = Meteor.user(), postWithSameLink = PostsModel.Posts.findOne({url: postAttributes.url});

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

    var postId = PostsModel.Posts.insert(post);

    return postId;
  },

  upvote: function (postId) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    PostsModel.Posts.update({
      _id: postId,
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});

this.PostsModel = PostsModel;
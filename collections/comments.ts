/// <reference path='../lib/permissions.ts'/>
/// <reference path='posts.ts'/>
/// <reference path='notifications.ts'/>
/// <reference path='../lib/typescript/meteor-typed-0.6.4.1.d.ts'>

module CommentsModel {
  export var Comments = new Meteor.Collection('comments');
};

Meteor.methods({
  insertComment: function (commentAttributes: CommentInterface) {
    var user = Meteor.user();
    var post = PostsModel.Posts.findOne(commentAttributes.postId); // ensure the user is logged in

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");

    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');

    if (!commentAttributes.postId)
      throw new Meteor.Error(422, 'You must comment on a post');

    var comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), { userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    PostsModel.Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    // create the comment, save the id
    comment._id = CommentsModel.Comments.insert(comment);

    // now create a notification, informing the user that there's been a comment
    NotificationsModel.createCommentNotification(comment);

    return comment._id;
  }
});

interface CommentInterface {
  postId: Number;
  body: String;
};

this.CommentsModel = CommentsModel;
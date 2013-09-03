/// <reference path='../lib/typescript/meteor.d.ts'/>
/// <reference path='models.ts'/>
/// <reference path='../lib/typescript/underscore.d.ts'/>
/// <reference path='../lib/permissions.ts'/>

Meteor.methods({
  insertComment: function (commentAttributes: IComment) {
    var user = Meteor.user();
    var post = Models.Posts.findOne(commentAttributes.postId); // ensure the user is logged in

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

    Models.Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    // create the comment, save the id
    comment._id = Models.Comments.insert(comment);

    // now create a notification, informing the user that there's been a comment
    Models.createCommentNotification(comment);

    return comment._id;
  }
});

interface IComment {
  postId: Number;
  body: String;
};


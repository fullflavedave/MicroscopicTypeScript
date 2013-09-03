Models.Posts.deny({
    update: function (userId, post, fieldNames) {
        return (_.without(fieldNames, 'url', 'title', 'message').length > 0);
    }
});

Models.Posts.allow({
    update: Permissions.ownsDocument,
    remove: Permissions.ownsDocument
});

Meteor.methods({
    insertPost: function (postAttributes) {
        var user = Meteor.user(), postWithSameLink = Models.Posts.findOne({ url: postAttributes.url });

        if (!user)
            throw new Meteor.Error(401, "You need to login to post new stories");

        if (!postAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a title');

        if (postAttributes.url && postWithSameLink) {
            throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
        }

        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });

        var postId = Models.Posts.insert(post);

        return postId;
    },
    upvote: function (postId) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to upvote");

        Models.Posts.update({
            _id: postId,
            upvoters: { $ne: user._id }
        }, {
            $addToSet: { upvoters: user._id },
            $inc: { votes: 1 }
        });
    }
});

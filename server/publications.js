Meteor.publish('newPosts', function (limit) {
    return Model.Posts.find({}, { sort: { submitted: -1 }, limit: limit });
});

Meteor.publish('bestPosts', function (limit) {
    return Model.Posts.find({}, { sort: { votes: -1, submitted: -1 }, limit: limit });
});

Meteor.publish('singlePost', function (id) {
    return id && Model.Posts.find(id);
});
//@ sourceMappingURL=publications.js.map

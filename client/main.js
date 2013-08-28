var Handles;
(function (Handles) {
    Handles.newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
    Handles.bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);
})(Handles || (Handles = {}));

Deps.autorun(function () {
    Meteor.subscribe('singlePost', Session.get('currentPostId'));

    Meteor.subscribe('comments', Session.get('currentPostId'));
});

Meteor.subscribe('notifications');

this.Handles = Handles;

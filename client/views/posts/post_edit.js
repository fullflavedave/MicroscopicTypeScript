Template.postEdit.helpers({
    post: function () {
        return Models.Posts.findOne(Session.get('currentPostId'));
    }
});

Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();
        var currentPostId = Session.get('currentPostId');
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        };

        Meteor.Errors.clear();

        Models.Posts.update(currentPostId, { $set: postProperties }, function (error) {
            if (error) {
                console.log("Found an error, Dave!");
                Meteor.Errors.throw(error.reason);
            } else {
                Meteor.Router.to('postPage', currentPostId);
            }
        });
    },
    'click .delete': function (e) {
        e.preventDefault();
        if (confirm("Delete this post?")) {
            var currentPostId = Session.get('currentPostId');
            Models.Posts.remove(currentPostId);
            Meteor.Router.to('postsList');
        }
    }
});

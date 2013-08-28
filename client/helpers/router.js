Meteor.Router.add({
    '/': {
        to: 'newPosts',
        as: 'home',
        and: function (id) {
            Session.set('currentPostId', null);
        }
    },
    '/best': {
        to: 'bestPosts',
        and: function (id) {
            Session.set('currentPostId', null);
        }
    },
    '/new': {
        to: 'newPosts',
        and: function (id) {
            Session.set('currentPostId', null);
        }
    },
    '/posts/:_id': {
        to: 'postPage',
        and: function (id) {
            Session.set('currentPostId', id);
        }
    },
    '/posts/:_id/edit': {
        to: 'postEdit',
        and: function (id) {
            Session.set('currentPostId', id);
        }
    },
    '/post/new': {
        to: 'postNew'
    }
});

Meteor.Router.filters({
    'requireLogin': function (page) {
        if (Meteor.user())
            return page; else if (Meteor.loggingIn())
            return 'loading'; else
            return 'accessDenied';
    },
    'clearErrors': function (page) {
        Meteor.Errors.clear();
        return page;
    }
});

Meteor.Router.filter('requireLogin', { only: 'postNew' });
Meteor.Router.filter('clearErrors');
//@ sourceMappingURL=router.js.map

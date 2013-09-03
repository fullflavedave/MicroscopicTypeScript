Template.notifications.helpers({
    notifications: function () {
        return Models.Notifications.find({ userId: Meteor.userId(), read: false });
    },
    notificationCount: function () {
        return Models.Notifications.find({ userId: Meteor.userId(), read: false }).count();
    }
});

Template.notifications.events({
    'click a': function () {
        Models.Notifications.update(this._id, { $set: { read: true } });
    }
});

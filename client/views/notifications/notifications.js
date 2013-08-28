Template.notifications.helpers({
    notifications: function () {
        return NotificationsModel.Notifications.find({ userId: Meteor.userId(), read: false });
    },
    notificationCount: function () {
        return NotificationsModel.Notifications.find({ userId: Meteor.userId(), read: false }).count();
    }
});

Template.notifications.events({
    'click a': function () {
        NotificationsModel.Notifications.update(this._id, { $set: { read: true } });
    }
});

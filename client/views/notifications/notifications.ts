/// <reference path='../../../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>
/// <reference path='../../../lib/typescript/template_types.ts'/>
/// <reference path='../../../collections/notifications.ts'/>

Template.notifications.helpers({
  notifications: function () {
    return NotificationsModel.Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function () {
    return NotificationsModel.Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notifications.events({
  'click a': function () {
    NotificationsModel.Notifications.update(this._id, {$set: {read: true}});
  }
})
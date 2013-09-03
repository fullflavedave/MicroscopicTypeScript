/// <reference path='../../../lib/typescript/meteor.d.ts'/>
/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../collections/models.ts'/>

Template.notifications.helpers({
  notifications: function () {
    return Models.Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function () {
    return Models.Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notifications.events({
  'click a': function () {
    Models.Notifications.update(this._id, {$set: {read: true}});
  }
})
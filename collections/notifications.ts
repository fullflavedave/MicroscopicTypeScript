/// <reference path='../lib/permissions.ts'/>
/// <reference path='models.ts'/>

Models.Notifications.allow({
  update: Permissions.ownsDocument
});

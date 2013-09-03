/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../lib/typescript/underscore.d.ts'/>

Template.header.helpers({
  activeRouteClass: function (/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function (name) {
      return location.pathname === Meteor.Router[name + 'Path']();
    });

    return active && 'active';
  }
});


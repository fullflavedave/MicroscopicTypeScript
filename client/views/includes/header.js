Template.header.helpers({
    activeRouteClass: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function (name) {
            return location.pathname === Meteor.Router[name + 'Path']();
        });

        return active && 'active';
    }
});
//@ sourceMappingURL=header.js.map

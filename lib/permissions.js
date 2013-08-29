var Permissions;
(function (Permissions) {
    Permissions.ownsDocument = function (userId, doc) {
        return doc && doc.userId === userId;
    };
})(Permissions || (Permissions = {}));

this.Permissions = Permissions;
//@ sourceMappingURL=permissions.js.map

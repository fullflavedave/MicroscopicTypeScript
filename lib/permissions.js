var Permissions;
(function (Permissions) {
    var DocPermissions = (function () {
        function DocPermissions() {
            this.ownsDocument = function (userId, doc) {
                return doc && doc.userId === userId;
            };
        }
        return DocPermissions;
    })();
    Permissions.DocPermissions = DocPermissions;
})(Permissions || (Permissions = {}));

this.Permissions = Permissions;
//@ sourceMappingURL=permissions.js.map

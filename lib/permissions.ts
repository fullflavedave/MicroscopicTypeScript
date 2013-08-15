module Permissions {

  export var ownsDocument = function(userId: string, doc: any): boolean {
      return doc && doc.userId === userId;
    };

}

this.Permissions = Permissions;
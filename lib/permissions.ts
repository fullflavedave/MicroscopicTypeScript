module Permissions {
  // check that the userId specified owns the documents
  export class DocPermissions {
/*    userId: string;
    doc: Object;
    constructor(userId:string, doc:Object) {
      this.userId = userId;
      this.doc = doc;
    }
*/

    public ownsDocument = function(userId, doc):boolean {
      return doc && doc.userId === userId;
    };
  }
}

this.Permissions = Permissions;
/// <reference path='../../../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>

Template.comment.helpers({
  submittedText: function () {
    return new Date(this.submitted).toString();
  }
});
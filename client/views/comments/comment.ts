/// <reference path='../view-model-types.d.ts'/>

Template.comment.helpers({
  submittedText: function () {
    return new Date(this.submitted).toString();
  }
});
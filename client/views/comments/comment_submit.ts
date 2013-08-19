/// <reference path='../../../lib/typescript/meteor.d.ts'/>
/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../lib/typescript/jquery.d.ts'/>


Template.commentSubmit.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var comment = {
      body: $(event.target).find('[name=body]').val(),
      postId: template.data._id
    };

    Meteor.call('insertComment', comment, function (error, commentId) {
      error && Meteor.Errors.throw(error.reason);
    });
  }
});
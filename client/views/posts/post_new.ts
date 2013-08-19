/// <reference path='../../../lib/typescript/meteor.d.ts'/>
/// <reference path='../view-model-types.d.ts'/>
/// <reference path='../../../lib/typescript/jquery.d.ts'/>

Template.postNew.events({
  'submit form': function (event) {
    event.preventDefault();
    var post = {
      url: $(event.target).find('[name=url]').val(),
      title: $(event.target).find('[name=title]').val(),
      message: $(event.target).find('[name=message]').val()
    }

    // DA: I added this in so that duplicate errors aren't shown after multiple posts
    Meteor.Errors.clear();

    Meteor.call('insertPost', post, function (error: any, id: string) {
      if (error) {
        //display the error to the user
        Meteor.Errors.throw(error.reason);

        // if the error is that the post already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('postPage', error.details)
      } else {
        Meteor.Router.to('postPage', id);
      }
    });
  }
});
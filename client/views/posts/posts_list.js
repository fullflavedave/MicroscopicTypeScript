var postsData = [
  {
    title: 'Introducing Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com'
  },
  {
    title: 'The Meteor Book', author: 'Tom Coleman',
    url: 'http://themeteorbook.com'
  }
];

Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}, limit: postsHandle.limit()});
  },
  postsReady: function() {
    return ! postsHandle.loading();
  },
  allPostsLoaded: function() {
    return ! postsHandle.loading() &&
        Posts.find().count() < postsHandle.loaded();
  }
});

Template.postsList.events({
  'click .load-more': function(event) {
    event.preventDefault();
    postsHandle.loadNextPage();
  }
})
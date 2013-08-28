/// <reference path='../lib/typescript/meteor.d.ts'/>
/// <reference path='../collections/posts.ts'/>
/// <reference path='../collections/comments.ts'/>


// Fixture data
if (PostsModel.Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({ profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' } });
  var sacha = Meteor.users.findOne(sachaId);
  var telescopeId = PostsModel.Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/', submitted: now - 7 * 3600 * 1000,
    commentsCount: 2,
    upvoters: [], votes: 0 });
  CommentsModel.Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Interesting project Sacha, can I get involved?'
  });
  CommentsModel.Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name, submitted: now - 3 * 3600 * 1000, body: 'You sure can Tom!'
  });
  PostsModel.Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com', submitted: now - 10 * 3600 * 1000, commentsCount: 0,
    upvoters: [], votes: 0 });
  PostsModel.Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com', submitted: now - 12 * 3600 * 1000, commentsCount: 0,
    upvoters: [], votes: 0
  });
  for (var i = 0; i < 10; i++) {
    PostsModel.Posts.insert({
      title: 'Test post #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i, submitted: now - i * 3600 * 1000, commentsCount: 0,
      upvoters: [], votes: 0 });
  }
}
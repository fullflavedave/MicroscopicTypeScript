Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function(userId, doc){
    return !! userId;
  }
})
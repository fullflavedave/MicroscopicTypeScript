/// <reference path='../../lib/typescript/meteor.d.ts'/>

interface ITemplate {
  newPosts: IMeteorViewModel;
  bestPosts: IMeteorViewModel;
  postsList: IMeteorViewModel;
  comment: IMeteorViewModel;
  commentSubmit: IMeteorViewModel;
  notifications: IMeteorViewModel;
  postPage: IMeteorViewModel;
  postEdit: IMeteorViewModel;
  postItem: IMeteorViewModel;
  postNew: IMeteorViewModel;
  header: IMeteorViewModel;
}

declare var Template: ITemplate;

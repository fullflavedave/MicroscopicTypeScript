/// <reference path='../../lib/typescript/meteor.d.ts'/>

interface ITemplate {
  newPosts: IViewModel;
  bestPosts: IViewModel;
  postsList: IViewModel;
  comment: IViewModel;
  commentSubmit: IViewModel;
  notifications: IViewModel;
  postPage: IViewModel;
  postEdit: IViewModel;
  postItem: IViewModel;
  postNew: IViewModel;
  header: IViewModel;
}

declare var Template: ITemplate;

/// <reference path='../../lib/typescript/meteor-typed-0.6.4.1.d.ts'/>

interface ITemplate {
  newPosts: IViewModel;
  bestPosts: IViewModel;
  postsList: IViewModel;
  comment: IViewModel;
  notifications: IViewModel;
  postPage: IViewModel;
  postEdit: IViewModel;
 }

declare var Template: ITemplate;

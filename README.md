#MicroscopicTypescript

This is the microscope reference app from [Discover Meteor](http://www.discovermeteor.com/ "http://www.discovermeteor.com/"), but written with TypeScript.

This app was written using the Meteor type definitions file found on [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped/tree/master/meteor 'https://github.com/borisyankov/DefinitelyTyped/tree/master/meteor').  Usage notes and tips are below.


---------------------------


#Meteor Type Definitions Usage Notes and Tips

In order to effectively write a Meteor app with TypeScript, you will probably need to do these things:

- Reference the Meteor type definitions file (meteor.d.ts)
- Create a Template definition file
- Create Collections within modules


##Referencing Meteor type definitions in your app
- Place the meteor.d.ts file in a directory (maybe `<app root dir>/lib/typescript`)
- Add `/// <reference path='../lib/typescript/meteor.d.ts'/>` to the top of any TypeScript file

This will make these typed Meteor variables/objects available across your application:

- Meteor
- Session
- Deps
- Accounts
- Match
- Computation
- Dependency
- EJSON
- HTTO
- Email
- Assets
- DPP

*Please note that the Template variable is not automatically available.  You need to follow the instructions below to use the Template variable.*


##Defining Templates
In order to call `Template.yourTemplateName.method`, you will need to create a simple TypeScript definition file that declares a Template variable containing a list of template view-models/managers of type IMeteorViewModel (or IMeteorManager, which is the same as IMeteorViewModel).  A good place for this definition could be `<app root dir>/client/views/view-model-types.d.ts`.  Here is an example of that file:

	/// <reference path='../../lib/typescript/meteor.d.ts'/>

	declare var Template: {
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

After you create this file, you may access the Template variable by declaring something similar to `/// <reference path='../view-model-types.d.ts'/>` at the top of any TypeScript file containing references to Template.  Something like `Template.postsList.helpers()` would then transpile successfully (and also have the benefits of typing).


##Defining Collections
In TypeScript, global variables are not allowed, and in a Meteor app, creating a local variable (using `var <varName>`) limits a variable's scope to the file.  However, you will probably want to define variables, such as collections, that can be used across files.  In the case of collections, one way to work around these limitations is to wrap each collection within a module, and then make the module globally accessible.  Here is an example using posts.ts:

	module PostsModel {
	  export var Posts = new Meteor.Collection('posts');
	};

	this.PostsModel = PostsModel;

You can then access the Posts collection by placing something similar to `/// <reference path='../../../collections/posts.ts'/>` at the top of a TypeScript file.  The code within the file something would look something like this:

	PostsModel.Posts.findOne(Session.get('currentPostId'));


##Reference app
A simple Meteor reference application created with TypeScript is listed below.  It is based on the Microscope reference app in [Discover Meteor](http://www.discovermeteor.com/ "http://www.discovermeteor.com/").

- Sample Site:  <http://microscopic-typescript.meteor.com/>
- Code (TypeScript and transpiled JS):  <https://github.com/fullflavedave/MicroscopicTypeScript>

##Meteor package
There will hopefully be a Meteor package soon listed on [Atmosphere](http://atmosphere.meteor.com "http://atmosphere.meteor.com") that can be easily added using `mrt add typescript`.
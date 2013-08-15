interface IMeteor {

  /***************
   * Collections *
   ***************/

  /**
   * Constructor for a collection.
   *
   * @param name The name of the collection. If null, creates an unmanaged (unsynchronized) local collection.
   * @param options Can be connection Object, idGeneration string, or transform callback function `list`, optional.
   * @constructor
   */
  Collection(name: string, options?: Object): void;

  /***********
   * Methods *
   ***********/

  /**
   * The id of the user that made this method call, or null if no user was logged in.
   * The user id is an arbitrary string — typically the id of the user record in the database.
   * You can set it with the setUserId function. If you're using the Meteor accounts system then
   * this is handled for you.
   */
  userId(): string;

  /**
   * Defines functions that can be invoked over the network by clients.
   *
   * @param methods Dictionary whose keys are method names and values are functions.
   */
  methods(methods: Object): void;

  /**
   * This class represents a symbolic error thrown by a method.
   *
   * @param error A numeric error code, likely similar to an HTTP code (eg, 404, 500).
   * @param reason A short human-readable summary of the error, like 'Not Found', optional.
   * @param details Additional information about the error, like a textual stack trace, optional.
   * @constructor
   */
  Error(error: number, reason?: string, details?: string): void;

  /************
   * Accounts *
   ************/

  /**
   * Get the current user record, or null if no user is logged in. A reactive data source.
   */
  user(): IUser;

  /*************************
   * Publish and Subscribe *
   *************************/

  /**
   * Publish a record set.
   *
   * @param name Name of the attribute set. If null, the set has no name, and the record set is automatically sent to
   *             all connected clients.
   * @param func Function called on the server each time a client subscribes. Inside the function, this is the publish
   *             handler object, described below. If the client passed arguments to subscribe, the function is called
   *             with the same arguments.
   */
  publish(name: string, func: Function): void;

  subscribe(name: string, arg1?: any, arg2?: any, ars3?: any, arg4?: any, callbacks?: Function[]): IHandle;


  /******************** Begin types from contributed packages on Atmosphere (or elsewhere) **************************/

  /**************************************************
   * For contributed package paginated-subscription *
   **************************************************/

  subscribeWithPagination(collection: string, limit: number): IHandle;

  /**
   * Call a template function by name to produce HTML
   *
   * @constructor
   */
  Template(): void;

  /**
   * From contributed package router *
   */
  Router: IRouter;

  /**
   * From contributed package error
   */
  Errors: IErrors;

  /******************** End types from contributed packages on Atmosphere (or elsewhere) **************************/

}

/******************** Begin types from contributed packages on Atmosphere (or elsewhere) **************************/

/*** Begin types for contributed packages ***/

interface IRouter {
  page(): void;
  add(route: Object): void;
  to(path: string, ...args: any[]): void;
}

declare var Router: IRouter;

interface IErrors {
  throw(message: string): void;
  clear(): void;
}


/******************** End types from contributed packages on Atmosphere (or elsewhere) **************************/

interface ICollection {
  find(selector, options?: Object): Object;
  findOne(selector, options?: Object): Object;
  insert(doc, callback?: Function): number;
  update(selector, modifier, options?: Object, callback?: Function): void;
  remove(selector, callback?: Function): void;
  allow(options: Object): boolean;
  deny(options: Object): boolean;
}

interface IUser {
  _id: number;
  username: number;
}

/*************
 * Templates *
 *************/

/**
 *  To use Template.templateName.function, you need to define an interface in a separate file (e.g. template-types.d.ts):
 *     interface TemplateInterface {
 *       postsList: ViewModelInterface;
 *       comment: ViewModelInterface;
 *       notifications: ViewModelInterface;
 *       [your template name]: ViewModelInterface;
 *     }
 *     declare var Template: TemplateInterface;
 */
interface IViewModel {
  helpers(helpers: Object): Object;
  events(eventMap: Object): void;
}

/***********
 * Session *
 ***********/
interface ISession {
  set(key: string, value: Object): void;
  get(key: string): Object;
}

interface IHandle {
  loaded(): number;
  limit(): number;
  ready(): boolean;
  loadNextPage(): void;
}

interface IDeps {
  autorun(runFunc: Function): Object;
}

declare var Meteor: IMeteor;
declare var Collection: ICollection;
declare var Session: ISession;
declare var Deps: IDeps;


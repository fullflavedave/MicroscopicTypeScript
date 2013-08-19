interface IMeteor {

  /********
   * Core *
   ********/
  isClient: boolean;
  isServer: boolean;
  startup(func: Function): void;
  absoluteUrl(path: string, options: IAbsoluteURLOptions): void;
  settings: Object;
  release: string;


  /*************************
   * Publish and Subscribe *
   *************************/
  publish(name: string, func: Function): void;
  subscribe(name: string, arg1?: any, arg2?: any, ars3?: any, arg4?: any, callbacks?: Function[]): IHandle;


  /***********
   * Methods *
   ***********/
  methods(methods: Object): void;
  Error(error: number, reason?: string, details?: string): void;
  call(name: string, param1?: any, param2?: any, param3?: any, asyncCallback?: Function): void;
  apply(name: string, options: any[], asyncCallback?: Function): void;
  defer(callback: Function): void;


  /*********************
   * ServerConnections *
   *********************/
  status(): {
    connected: boolean
    status: string;
    retryCount: number;
    retryTime: number;
    reason: string;
  }
  reconnect(): void;
  disconnect(): void;


  /***************
   * Collections *
   ***************/
  Collection(name: string, options?: ICollectionOptions): void;


  /************
   * Accounts *
   ************/
  user(): IUser;
  userId(): string;
  users: ICollection;
  loggingIn(): boolean;
  logout(callback?: Function): void;
  loginWithPassword(user: Object, password: string, callback?: Function): void;
  loginWithExternalService(options: IExternalServiceOptions, callback?: Function): void;

  /**
   * Passwords
   */


  /******************** Begin types from contributed packages on Atmosphere (or elsewhere) **************************/

  /**************************************************
   * For contributed package paginated-subscription *
   **************************************************/
  subscribeWithPagination(collection: string, limit: number): IHandle;
  Template(): void;

  /**
   * For contributed package router *
   */
  Router: IRouter;

  /**
   * For contributed package error
   */
  Errors: IErrors;

  /******************** End types from contributed packages on Atmosphere (or elsewhere) **************************/

}

/******************** Begin types from contributed packages on Atmosphere (or elsewhere) **************************/

interface IRouter {
  page(): void;
  add(route: Object): void;
  to(path: string, ...args: any[]): void;
  filters(filtersMap: Object);
  filter(filterName: string, options?: Object);
}

interface IErrors {
  throw(message: string): void;
  clear(): void;
}

/******************** End types from contributed packages on Atmosphere (or elsewhere) **************************/

/**
 * Core
 */
interface IAbsoluteURLOptions {
  secure: boolean;
  replaceLocalhost: boolean;
  rootUrl: string;
}

/**
 * Collections
 */
interface ICollection {
  find(selector, options?: Object): ICursor;
  findOne(selector, options?: Object): Object;
  insert(doc, callback?: Function): number;
  update(selector, modifier, options?: Object, callback?: Function): void;
  remove(selector, callback?: Function): void;
  allow(options: Object): boolean;
  deny(options: Object): boolean;
  ObjectID(hexString?: string): Object;
}

interface ICollectionOptions {
  connection?: Object;
  idGeneration?: string;
  transform?: Function;
}

interface ICursor {
  forEach(callback: Function): void;
  map(callback: Function): void;
  fetch(): any[];
  count(): number;
  rewind(): void;
  observe(callbacks: Object): void;
  observeChanges(callbacks: Object): void;
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
 *  e.g.   interface TemplateInterface {
 *           postsList: ViewModelInterface;
 *           comment: ViewModelInterface;
 *           notifications: ViewModelInterface;
 *           [your template name]: ViewModelInterface;
 *     }
 *     declare var Template: TemplateInterface;
 */
interface IViewModel {
  helpers(helpers: Object): Object;
  events(eventMap: Object): void;
  rendered(callback: Function): void;
}

/***********
 * Session *
 ***********/
interface ISession {
  set(key: string, value: Object): void;
  setDefault(key: string, value: Object): void;
  get(key: string): Object;
  equals(key: string, value: any): void;
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

/**************************
 * Accounts and Passwords *
 **************************/
interface IAccounts {
  config(options: IAccountConfigOptions): void;
  ui: {
    config(options: IAccountConfigUIOptions);
  }
  validateNewUser(func: Function): void;
  onCreateUser(func: Function): void;
}

interface IExternalServiceOptions {
  requestPermissions?: string[];
  requestOfflineToken?: boolean;
  forceApprovalPrompt?: boolean;
}

interface IAccountConfigOptions {
  sendVerificaitonEmail?: boolean;
  forbidClientAccountCreation?: boolean;
}

interface IAccountConfigUIOptions {
  requestPermissions?: Object;
  requestOfflineToken?: Object;
  passwordSignupFields?: string;
}

/**
 * DPP
 */
interface IDPP {
  connect(url: string): void;
}

declare var Meteor: IMeteor;
declare var Collection: ICollection;
declare var Session: ISession;
declare var Deps: IDeps;
declare var Accounts: IAccounts;
declare var DPP: IDPP;
declare var Router: IRouter;



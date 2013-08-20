/**
 * Todo:
 * Need to come back to this.functions
 * How to define the signature of callback function and other functions
 * **/

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
   * Timers
   */
  setTimeout(func: Function, delay: number): void;
  setInterval(func: Function, delay: number): void;
  clearTimeout(id: number): void;
  clearInterval(id: number): void;


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

/**
 * Router and Iron-Router packages
 */
interface IRouter {

  // These are for Router
  page(): void;
  add(route: Object): void;
  to(path: string, ...args: any[]): void;
  filters(filtersMap: Object);
  filter(filterName: string, options?: Object);

  // These are for Iron-Router
  map(routeMap: Function): void;
  path(route: string, params?: Object): void;
  url(route: string): void;
  routes: Object;
  configure(options: IRouterConfiguration): void;
}

// For Iron-Router
interface IRouterConfiguration {
  layout: string;
  notFoundTemplate: string;
  loadingTemplate: string;
  renderTemplates: Object;
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
  createUser(options: ICreateUserOptions, callback?: Function): void;
  changePassword(oldPassword: string, newPassword: string, callback?: Function): void;
  forgotPassword(options: IForgotPasswordOptions, callback?: Function): void;
  resetPassword(token: string, newPassword: string, callback?: Function): void;
  setPassword(userId: string, newPassword: string): void;
  verifyEmail(token: string, callback?: Function): void;
  sendResetPasswordEmail(userId: string, email?: string): void;
  sendEnrollmentEmail(userId: string, email?: string): void;
  sendVerificationEmail(userId: string, email?: string): void;
  emailTemplates: {
    from: string;
    siteName: string;
    resetPassword: IEmailValues;
    enrollAccount: IEmailValues;
    verifyEmail: IEmailValues;
  }
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

interface ICreateUserOptions {
  username?: string;
  email?: string;
  password?: string;
  profile?: string;
}

interface IForgotPasswordOptions {
  email: string;
}

interface IEmailValues {
  subject?: Function;
  text?: Function;
}

interface Match {
  test(value: any, pattern: any): boolean;
}

/**
 * Deps
 */
interface Deps {
  autorun(runFunc: Function): IComputationObject;
  flush(): void;
  nonreactive(func: Function): void;
  active: boolean;
  currentComputation: IComputationObject;
  onInvalidate(callback: Function): void;
  afterFlush(callback: Function): void;

  /**
   * @constructor
   */
  Computation(): void;

  /**
   * @constructor
   */
  Dependency(): void;
}

interface IComputationObject {
  stop(): void;
  invalidate(): void;
  onInvalidate(callback: Function): void;
  stopped: boolean;
  invalidated: boolean;
  firstRun: boolean;
}

interface IDependencyObject {
  changed(): void;
  depend(fromComputation?: IComputationObject): boolean;
  hasDependents(): boolean;
}

/**
 * EJSON
 */
interface EJSON {
  parse(str: string): void;
  stringify(val: any): string;
  fromJSONValue(val): any;
  toJSONValue(val): JSON;
  equals(any: any): boolean;
  clone(val: any): any;
  newBinary(size: number): void;
  isBinary(x: any): boolean;
  addType(name: string, factory: Function): void;
}

/**
 * HTTP package
 */
interface HTTP {
  call(method: string, url: string, options?: IHTTPCallOptions, asyncCallback?: Function): IHTTPResultObject;
  get(url: string, options?: IHTTPCallOptions, asyncCallback?: Function): IHTTPResultObject;
  post(url: string, options?: IHTTPCallOptions, asyncCallback?: Function): IHTTPResultObject;
  put(url: string, options?: IHTTPCallOptions, asyncCallback?: Function): IHTTPResultObject;
  del(url: string, options?: IHTTPCallOptions, asyncCallback?: Function): IHTTPResultObject;
}

interface IHTTPCallOptions {
  content?: string;
  data?: Object;
  query?: string;
  params?: Object;
  auth?: string;
  headers?: Object;
  timeout?: number;
  followRedirects?: boolean;s
}

interface IHTTPResultObject {
  statusCode: number;
  content: string;
  data?: JSON;
  headers: Object;
}

/**
 * Email
 */
interface Email {
  send(options: IEmailOptions): void;
}

interface IEmailOptions {
  from: string;
  to: any;
  cc: any;
  bcc: any;
  replyTo: any;
  subject: string;
  text: string;
  html: string;
  headers: Object;
}

/**
 * Assets
 */
interface Assets {
  getText(assetPath: string, asyncCallback?: Function): string;
  getBinary(assetPath: string, asyncCallback?: Function): any;
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



declare function check(value: any, pattern: any): void;
declare var Computation: IComputationObject;
declare var Dependency: IDependencyObject;
declare var DPP: IDPP;
declare var Router: IRouter;
interface MeteorInterface {

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
  Error(error: Number, reason?: String, details?: String): void;

  /************
   * Accounts *
   ************/

  /**
   * Get the current user record, or null if no user is logged in. A reactive data source.
   */
  user(): UserInterface;

  /*************************
   * Publish and Subscribe *
   *************************/

  /**
   * Publish a record set.
   *
   * @param name Name of the attribute set. If null, the set has no name, and the record set is automatically sent to all connected clients.
   * @param func Function called on the server each time a client subscribes. Inside the function, this is the publish handler object, described below. If the client passed arguments to subscribe, the function is called with the same arguments.
   */
  publish(name: String, func: Function): void;
}

interface CollectionInterface {
  find(selector, options?: Object): Object;
  findOne(selector, options?: Object): Object;
  insert(doc, callback?: Function): Number;
  update(selector, modifier, options?: Object, callback?: Function): void;
  remove(selector, callback?: Function): void;
  allow(options: Object): Boolean;
  deny(options: Object): Boolean;
}

interface UserInterface {
  _id: Number;
  username: Number;
}

declare var Meteor: MeteorInterface;
declare var Collection: CollectionInterface;
# Mongo-backed Models with Mongoose

### Objectives
*After this lesson, students will be able to:*

- Update & destroy a model
- Initialize & create a new instance of a model
- Perform basic find queries

### Preparation
*Before this lesson, students should already be able to:*

- Describe how Mongo documents work
- Describe how an ORM works
- Create a basic NodeJS app

## Using MongoDB with Node - Intro (5 mins)

NodeJS and MongoDB work really well together. To handle HTTP requests and read from or send data to MongoDB, Mongoose is the most common Node.js ORM to manipulate data using MongoDB: CRUD functionality is something that is necessary in almost most every application, as we still have to create, read, update, and delete data.

Since we'll be able to use JSON across our application - with Mongo and Node - using JavaScript in our application is much easier. The MEAN stack - Mongo, Express, Angular, and Node - is becoming increasingly popular because of this.

For today, we will build a simple Node app in a folder and a file server.js.

#### What Is Mongoose?

Mongoose is an object modeling package - think ORM for Node; this gives us the MongoDB CRUD commands.  Technically it is [ODM](http://stackoverflow.com/questions/12261866/what-is-the-difference-between-an-orm-and-an-odm)

## Setting up Mongoose in your app - Codealong (5 mins)

Create a new Express app and install the relevant npm packages:

1. `mkdir family-tree`
2. `cd family-tree`
3. `touch server.js`
4. `npm init`
4. `npm install express --save`
5. `npm install morgan --save`
6. `npm install body-parser --save` 

To use Mongoose in your Node app:

```bash
$ npm install mongoose --save
```

With the package installed, lets use it - open server.js and add:

```javascript
// Standard stuff
var express = require( 'express' );
var path = require( 'path' );

var logger = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Mongoose stuff
var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/family-tree' );
```

You can now execute all the mongoDB commands over the database `family-tree`.


## Working with Models - Codealong (20 mins)


#### Defining a Model

A Mongoose Model is required before we can use any of our new CRUD operations; think of the models as constructors we define, that allows us to add documents to and request the structure from our database. Our Mongoose Schema is what we'll use to define our document attributes. Think about it like this: a document is the equivalent of a record/row in a relational database; only here, our attributes - or columns - are flexible.

Something different about this ODM... we can define methods in our Mongoose schema!

From within our family-tree app:

```bash
mkdir models
touch models/user.js
```

Now let's add:

```javascript
var mongoose = require( 'mongoose' );

// create a schema
var UserSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String,
  },
  createdAt: Date,
  updatedAt: Date
});
```

MongoDB is schemaless, meaning: all the documents in a collection can have different fields, but for the purpose of a web app, often containing validations, it's better to use a schema that will cast and validate each type.

At the moment we only have the schema, representing the structure of the data we want to use. To save some data, we will need to make this file a Mongoose model and export it:

```javascript
//in Users.js
var mongoose = require( 'mongoose' );

var UserSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String,
  },
  createdAt: Date,
  updatedAt: Date
});

var User = mongoose.model('User', UserSchema);

// make this available to our other files
module.exports = User;
```

Notice that you can use objects and nested attributes inside an object.

Here's a look at the datatypes we can use in Mongoose documents:

- String
- Number
- Date
- Boolean
- Array
- Buffer
- Mixed
- ObjectId

We can create the Mongoose Model with `mongoose.model`. Remember, we can define custom methods here - this would be where we could write a method to encrypt a password.

#### Creating Custom Methods

When defining a schema, you can add custom methods and call these methods on the models. You can even overwrite the default Mongoose document methods. Let's write a `sayHello` function under our schema:

```javascript
var UserSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  email: { type: String },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String,
  },
  createdAt: Date,
  updatedAt: Date
});

UserSchema.methods.sayHello = function() {
  console.log( "Hi " + this.firstName );
};

var User = mongoose.model('User', userSchema);

module.exports = User;
```

Now we can call it by requiring the User model in server.js:

```javascript
var User = require( './models/user' );
```

#### Create

// create a new user called bob
```

var bob = new User( {
  firstName: 'Bob',
  email: 'bob@ga.co',
  meta:{
    age: 27
  }
});

bob.sayHello();

bob.save( function (err) {
  if(err) {
    console.log(err);
  } else {
    console.log('User Created');
  }
});

```

Now run the app with `node server.js` to see the result!

We'll create another user using the User method from before, along with the default save method from Mongoose:

```javscript
var User = require( './models/user' );

var newUser = new User( {
  firstName: 'gerry',
  email: 'gerry@gmail.com',
  password: 'password',
});

// save the user
newUser.save( function( err ) {
	if ( err ) {
		console.log( err );
	} else { 
		console.log( 'User created!' );
	}
});
```

#### What about Read?

We can use the built in methods to get a hold of what we're looking for such as: `.find`, and `.findById`.

`.find` is quite dynamic

Inside `server.js` let's add:

```javscript
// Find All
User.find( {}, function( err, users ) {
	if ( err ) {
		console.log( err );
	} else {
		console.log( users );
	}
});
```

In Mongoose `.find` can get us 'all' the records, or just a more select list:

```javascript
//Find 'where'
User.find( { firstName: 'gerry' }, function( err, user ) {
	if ( err ) {
		console.log(err);
	} else {
		console.log(user);
	}
});
```

Mongoose's find by id is exactly that, classic camelCase, no magic: `.findById`:

```javascript
// get a user with ID of 1
User.findById( 1, function( err, user ) {
	if ( err ) {
		console.log( err );
	} else {
		console.log( user );
	}
});
```

#### Update

For update, you can do it in one of two ways - using `.findByIdAndUpdate()` or `.findOneAndUpdate()`:

```javascript
User.findOneAndUpdate(
	{ firstName: 'gerry' },
	{ meta: { age: 26 } },
	function(err, user) {
		if ( err ) {
			console.log( err );
		} else {
			console.log( user );
		}
	});
```

#### Destroy

Mongoose gives you two easy methods to delete documents - `findByIdAndRemove()`and `.findOneAndRemove()`.

```javascript
// find the user with firstName of 'gerry'
User.findOneAndRemove(
	{ firstName: 'gerry' },
	function(err) {
		if ( err ) {
			console.log( err );
		} else {
			console.log( 'User deleted!' );
		}
	});
```

## Extra Practice 

Using the code we just wrote and the [official Mongoose Models docs](http://mongoosejs.com/docs/models.html). Add a new schema called Books.

It should contain these properties:
title, author, isbn(this should be required), publishiing date

Now in your server.js file practice the following:
C.R.U.D


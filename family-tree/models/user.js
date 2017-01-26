var mongoose = require('mongoose');

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

var User = mongoose.model('User', UserSchema);

module.exports = User;

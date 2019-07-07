const bcrypt = require("bcrypt"); //require the bcrypt package installed

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,

    required: [true, "Please provide your username"]
  },

  email: {
    type: String,

    unique: true,

    required: [true, "Please provide your email."]
  },

  password: {
    type: String,

    required: [true, "Please provide your password."]
  }
});

UserSchema.pre("save", function(next) {
  //execute function in middleware before saving record into database

  const user = this; //get user

  bcrypt.hash(user.password, 10, function(error, encrypted) {
    //encrypt users password

    user.password = encrypted; //set users password to be encrypted version

    next();
  });
});
module.exports = mongoose.model("User", UserSchema);

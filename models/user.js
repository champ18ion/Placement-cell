const mongoose = require('mongoose');

// creating user Schema
const userSchema = new mongoose.Schema(
     {
        firstname: {
          type: String,
          required: true,
        },
        lastname:{
          type: String,
          required:true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
);

// exporting the schema
const User = new mongoose.model("User", userSchema);

module.exports = User;
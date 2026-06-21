const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Automatically creates a unique index in MongoDB
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "invalid Email",
      ],
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // Exclude passwordHash from query results by default
    },
    name: { type: String, required: true, trim: true, maxlength: 80 },
  },
  { timestamps: true },
);


// Instance method to compare incoming passwords during login
userSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 12);
};

// Instance method to compare incoming passwords during login
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

// Automatically strips sensitive properties when returning JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash; 
  delete obj.__v; 
  return obj;
};

module.exports = mongoose.model("User", userSchema);
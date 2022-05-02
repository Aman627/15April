const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    addresses: [
      {
        fullname: {
          type: String,
          required: true,
        },
        houseNumber: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        alternativePhone: {
          type: String,
          required: true,
        },
      },
    ],
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.method("matchPassword", async function (enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;

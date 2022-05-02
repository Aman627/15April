const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Auth user and get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      addresses: user.addresses,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc register new user
// @route POST /api/users
// @access publix
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
    phone,
    addresses: [],
  });

  if (user) {
    res.status(201);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isAdmin: user.isAdmin,
      email: user.email,
      addresses: user.addresses,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      addresses: user.addresses,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc udpate the user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.addresses = req.body.addresses || user.addresses;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      phone: updateUser.phone,
      isAdmin: updateUser.isAdmin,
      email: updateUser.email,
      addresses: updateUser.addresses,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc udpate the user profile address
// @route PUT /api/users/profile/addresses/:mode/:id
// @where mode[new, edit] and id is of address
// @access private
const updateUserProfileAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { id, mode } = req.params;
  console.log(id, mode);
  if (mode === "edit") {
    const updateAddress = await User.updateOne(
      { "addresses._id": id },
      {
        $set: {
          "addresses.$.fullname": req.body.fullname,
          "addresses.$.houseNumber": req.body.houseNumber,
          "addresses.$.address": req.body.address,
          "addresses.$.landmark": req.body.landmark,
          "addresses.$.city": req.body.city,
          "addresses.$.pincode": req.body.pincode,
          "addresses.$.alternativePhone": req.body.alternativePhone,
        },
      }
    );
    res.json({
      message: "Updated shipping address",
    });
  }
  if (mode === "new") {
    const updateAddress = await User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          addresses: {
            fullname: req.body.fullname,
            houseNumber: req.body.houseNumber,
            address: req.body.address,
            landmark: req.body.landmark,
            city: req.body.city,
            pincode: req.body.pincode,
            alternativePhone: req.body.alternativePhone,
          },
        },
      }
    );
    res.json({
      message: "Added new shipping address",
    });
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUserProfileAddress,
};

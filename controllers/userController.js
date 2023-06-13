const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route post/api/users/register
// @access private

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //   Creating a Hash Password

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is invalid");
  }
});

// @desc Login user
// @route post/api/users/login
// @access private

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }
  const user = await User.findOne({ email });

  //    Compare passward with Hashed Password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken }); 
  } else {
    res.status(401);
    throw new Error("email or password are not valid");
  }
});

// @desc Current user info
// @route post/api/users/current
// @access private

const currentUserInfo = asyncHandler(async (req, res) => {

  res.json(req.user);
});

module.exports = {
  registerUser,
  userLogin,
  currentUserInfo,
};

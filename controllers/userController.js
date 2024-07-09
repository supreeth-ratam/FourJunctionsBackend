const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_SECRET, {
    expiresIn: "1d",
  });
};

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.status(201).json({
      message: "new user created",
      username: newUser.username,
      id: newUser._id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create the user",
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed fetching users",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }
  const token = signToken(user._id);
  res.status(200).json({
    message: "logged in successfully",
    token,
    name: user.username,
    id: user._id,
  });
};

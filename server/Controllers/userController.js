const userModel = require("../Models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};
const register = async (req, res) => {
  console.log("register");
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json("Email Already Exists.");
    if (!name || !email || !password)
      return res.status(400).json("All Fields Are Required.");
    if (!validator.isEmail(email))
      return res.status(400).json("Email not valid.");
    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password is not strong");
      console.log(name)
    //converting password
    // user = new userModel({name, email, password});
    // console.log(user)
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json("Invalid Password.");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = { register, login, getAllUsers, getUser };

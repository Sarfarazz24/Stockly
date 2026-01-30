// const User = require("../model/UserModel");
const { findUserByEmail, createUser, findUserById } = require("../tempUserStore");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = createUser({ email, password: hashedPassword, username, createdAt });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please enter the details" });
    }
    const user = findUserByEmail(email);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Logged in successfully",
      success: true,
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

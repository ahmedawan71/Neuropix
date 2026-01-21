import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    var { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    email = email.toLowerCase().trim();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.json({ success: false, message: "Email already registered" });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token, user: { name: user.name } });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res)=> {
  try {
    const userId = req.userId

    const user = await userModel.findById(userId)
    return res.json({success:true, credits:user.creditBalance, user:{name:user.name}})
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
}

export {registerUser, loginUser, userCredits}
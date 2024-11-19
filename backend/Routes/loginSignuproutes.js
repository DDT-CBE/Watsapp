const express = require("express");
const router = express.Router();
const generateToken = require("../utlis");
const SignupModel = require("../Model/signup");
const UserInfoModel = require("../Model/UserinfoModel");

router.post("/signup", async (req, res) => {
  try {
    const { email ,name} = req.body;

    // Check if a user with the same email and role already exists
    const checkuser = await SignupModel.findOne({ email });
    if (checkuser) {
      return res
        .status(400)
        .json({ message: "This email and Role Type already exist" });
    }

    // Create a new user in SignupModel
    const newUser = await SignupModel.create(req.body);



    // Create a new user info document in UserInfoModel
    const newAuthuser = await UserInfoModel.create({
      name,
      auth_id: newUser._id,
    });

    res.status(201).json(newAuthuser); // Respond with the created user

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/login", async (req, res) => {
    const { email, password, type } = req.body;
  
    try {
      const loggedUser = await SignupModel.findOne({ email }); // Find user by email
  
      if (!loggedUser) {
        return res.status(404).json({ message: "User not found" }); // If no user found
      }
  
      if (loggedUser.password === password ) {
        const token = generateToken(loggedUser);
  
        res.status(201).json({ token });
      } else {
        res.status(401).json("Not Allow");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  module.exports = router;
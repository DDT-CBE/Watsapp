const express = require("express");
const router = express.Router();
const UserInfoModel = require("../Model/UserinfoModel");
const verifyToken = require("../middelware");

router.get("/data", verifyToken, async (req, res) => {
  const user = req.user; // Get the user from verifyToken middleware
  try {
    res.status(200).json(user); // Return user data with 200 OK
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
});

router.post("/addnumber", verifyToken, async (req, res) => {
    const { userId, groupId } = req.body; // Extract userId, businessProviderId, and credits
    try {
      // Find the user by userId
      const user = await UserInfoModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the businessProviderId is already in visibelNumbers
      if (!user.visibelGroups.includes(groupId)) {
        // Add the businessProviderId to visibelNumbers
        user.visibelGroups.push(groupId);
  
        // Update the credits by decrementing it
        if (user.credits > 0) {
          user.credits -= 1;  // Decrement credits by 1
        } else {
          return res.status(400).json({ message: "Insufficient credits" });
        }
  
        // Save the updated user
        await user.save();
  
        return res.status(200).json({ message: "Number added successfully" });
      } else {
        return res.status(400).json({ message: "Number already exists" });
      }
    } catch (error) {
      console.error("Error adding number:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;
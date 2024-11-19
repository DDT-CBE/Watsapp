const express = require("express");
const UserInfoModel = require("../Model/UserinfoModel"); // Adjust the path as necessary
const mongoose = require("mongoose");
const router = express.Router();

// Get hierarchical user data based on parentId
router.get("/hierarchy/:parentId", async (req, res) => {
  const { parentId } = req.params;

  try {
    // Convert parentId to ObjectId format
    const parentObjectId = new mongoose.Types.ObjectId(parentId);

    // Find the user's document to determine their level
    const user = await UserInfoModel.findById(parentObjectId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Initialize the aggregation pipeline
    const pipeline = [
      { $match: { _id: parentObjectId } },
    ];

    // Determine user type and add lookups accordingly
    if (user.type === "Company 2") {
      // Fetch District Franchises, Dealers, and Sub-Dealers based on children field
      pipeline.push(
        {
          $lookup: {
            from: "user_infos",
            localField: "children", // Points to District Franchises
            foreignField: "_id",
            as: "DistrictFranchises"
          }
        },
        { $unwind: { path: "$DistrictFranchises", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "user_infos",
            localField: "DistrictFranchises.children", // Points to Dealers under each District Franchise
            foreignField: "_id",
            as: "DistrictFranchises.dealers"
          }
        },
        { $unwind: { path: "$DistrictFranchises.dealers", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "user_infos",
            localField: "DistrictFranchises.dealers.children", // Points to Sub-Dealers under each Dealer
            foreignField: "_id",
            as: "DistrictFranchises.dealers.subDealers"
          }
        },
        { 
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            type: { $first: "$type" },
            DistrictFranchises: { $push: "$DistrictFranchises" }
          }
        }
      );

    } else if (user.type === "District Franchise") {
      // Fetch Dealers and Sub-Dealers based on children field
      pipeline.push(
        {
          $lookup: {
            from: "user_infos",
            localField: "children", // Points to Dealers
            foreignField: "_id",
            as: "Dealers"
          }
        },
        { $unwind: { path: "$Dealers", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "user_infos",
            localField: "Dealers.children", // Points to Sub-Dealers under each Dealer
            foreignField: "_id",
            as: "Dealers.subDealers"
          }
        },
        { 
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            type: { $first: "$type" },
            Dealers: { $push: "$Dealers" }
          }
        }
      );

    } else if (user.type === "Dealer") {
      // Fetch Sub-Dealers based on children field
      pipeline.push(
        {
          $lookup: {
            from: "user_infos",
            localField: "children", // Points to Sub-Dealers
            foreignField: "_id",
            as: "SubDealers"
          }
        },
        { 
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            type: { $first: "$type" },
            SubDealers: { $push: "$SubDealers" }
          }
        }
      );
    }

    // Execute the aggregation pipeline
    const hierarchy = await UserInfoModel.aggregate(pipeline);

    if (!hierarchy.length) {
      return res.status(404).json({ message: "No hierarchy found." });
    }

    res.status(200).json(hierarchy);
  } catch (error) {
    console.error("Error fetching hierarchy:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

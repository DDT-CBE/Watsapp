const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./Routes/loginSignuproutes")
const creditRoutes = require("./Routes/creditsRouts")
const SignupModel = require("./Model/signup");
const RegisterModel = require("./Model/RegisterModel");
const InstagramModel = require("./Model/InstagramModel")
const path = require("path");
const verifyToken = require("./middelware");
const UserInfoModel = require("./Model/UserinfoModel");
const WatsappGroupModel = require("./Model/WatsappGroupModel");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.dburl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



  app.use("/auth",authRoutes ); // Auth routes
  app.use("/auth",creditRoutes)


// get route for signup
app.get("/getdata", async (req, res) => {
  try {
    const getUser = await RegisterModel.find();
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});

app.get("/getsellerrequest", async (req, res) => {
  try {
    const getUser = await SellerModel.find({ approve: false });
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});

app.get("/getyoutubedata", async (req, res) => {
  try {
    const query = {
      approve: false, // Ensure only approved users are fetched
    };
    // Add filters for name and/or state if provided
    if (req.query.industry) {
      query.industry = {
        $regex: req.query.industry, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.category) {
      query.category = {
        $regex: req.query.category, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.district) {
      query.district = {
        $regex: req.query.district, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.state) {
      query.state = {
        $regex: req.query.state, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    const getUser = await RegisterModel.find(query);
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});


app.get("/getinstagramdata", async (req, res) => {
  try {
    const query = {
      approve: false, // Ensure only approved users are fetched
    };
    // Add filters for name and/or state if provided
    if (req.query.industry) {
      query.industry = {
        $regex: req.query.industry, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.category) {
      query.category = {
        $regex: req.query.category, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.district) {
      query.district = {
        $regex: req.query.district, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.state) {
      query.state = {
        $regex: req.query.state, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    const getUser = await InstagramModel.find(query);
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});


app.get("/getwatsappgroup", async (req, res) => {
  try {
    const query = {
      approve: false, // Ensure only approved users are fetched
    };
    // Add filters for name and/or state if provided
    if (req.query.industry) {
      query.industry = {
        $regex: req.query.industry, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.category) {
      query.category = {
        $regex: req.query.category, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.district) {
      query.district = {
        $regex: req.query.district, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.state) {
      query.state = {
        $regex: req.query.state, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    const getUser = await WatsappGroupModel.find(query);
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});

app.get("/data", verifyToken, async (req, res) => {
  const user = req.user; // Get the user from verifyToken middleware
  try {
    res.status(200).json(user); // Return user data with 200 OK
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
});


app.get("/getdealer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dealer = await UserInfoModel.find({ parentId: id });
    if (!dealer || dealer.length === 0) {
      return res.status(404).json({ message: "Dealer Not Found" }); // 404 for not found
    }
    res.status(200).json(dealer); // Return dealer data with 200 OK
  } catch (error) {
    console.error("Error fetching dealer:", error.message); // Log for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
});





// POST route for sellerregister

app.post("/watsappregister", async (req, res) => {
  try {
    const newUser = await WatsappGroupModel.create(req.body); // Create a new user in the database
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete route for signup
app.delete("/removeid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await SignupModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST route for login
app.post("/formregister", async (req, res) => {
  try {
    const { type } = req.body;

    let addUser;
    if (type === "Instagram") {
      addUser = await InstagramModel.create(req.body); // Save the data in InstagramModel if type is Instagram
    } else {
      addUser = await RegisterModel.create(req.body); // Otherwise, save the data in RegisterModel
    }
    
    res.json(addUser);
  } catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).json({ error: "Failed to save user" });
  }
});



app.put("/updatedata/:id", (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

  RegisterModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  RegisterModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updatesellerdata/:id", (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  SellerModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updateseller/:id", (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

  SellerModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/removebuyerregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await RegisterModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/removesellerregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await SellerModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

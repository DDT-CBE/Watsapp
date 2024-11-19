const jwt = require("jsonwebtoken");

const UserInfoModel = require("../Model/UserinfoModel");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Token" });
  }

//   const token = authHeader.split(" ")[1];



  jwt.verify(authHeader, process.env.SECRET_KEY, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    console.log("Decoded ID: " + decode.id);

    try {
      const user = await UserInfoModel.findOne({ auth_id: decode.id });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      req.user = user; // Attaching the user object to the request
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error finding user:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = verifyToken;

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { User } = require("../models/user");
const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Use the created uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Profile picture upload route
router.post(
  "/upload-pfp",
  upload.single("ProfilePicture"), // Single file with the field name "ProfilePicture"
  async (req, res) => {
    try {
      const { username } = req.body; // Extract the username from the request body

      console.log(username);

      if (!username) {
        return res.status(400).send({ message: "Username is required" });
      }

      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      const filePath = `/uploads/${req.file.filename}`;

      // Update the user's profilePicture field in the database
      const user = await User.findOneAndUpdate(
        { username }, // Find user by username
        { ProfilePicture: filePath }, // Update the profilePicture field
        { new: true } // Return the updated document
      );

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      await user.save();

      res.status(200).send({
        message: "File uploaded successfully",
        filePath,
        user,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send({ message: "Error uploading file", error });
    }
  }
);

module.exports = router;

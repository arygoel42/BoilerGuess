const express = require("express");
const multer = require("multer");
const { User } = require("../models/user");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();
require("dotenv").config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.CLOUD_API_SECRET, // Replace with your Cloudinary API secret
});

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-pictures", // Cloudinary folder to store uploaded files
    format: async (req, file) => "jpg", // Convert files to jpg format
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Use a unique filename
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

      if (!username) {
        return res.status(400).send({ message: "Username is required" });
      }

      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      const filePath = req.file.path; // Cloudinary provides the file URL as `path`

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

const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Profile picture upload route
router.post('/upload-pfp', upload.single('profilePicture'), (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    // Save the file path to the database or do further processing
    res.status(200).send({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    res.status(500).send({ message: 'Error uploading file', error });
  }
});

module.exports = router;

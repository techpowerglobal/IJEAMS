const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads")); // Save files here
  },
  filename: function (req, file, cb) {
  const uniquePrefix = Date.now();
  cb(null, uniquePrefix + "-" + file.originalname);
}
});

const upload = multer({ storage: storage });

// Upload route
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileDetails = {
    originalName: req.file.originalname,
    storedName: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    uploadDate: new Date()
  };

  // Later you can save fileDetails to MongoDB
  console.log("Uploaded File Details:", fileDetails);

  res.json({
    message: "File uploaded successfully",
    file: fileDetails
  });
});

module.exports = router;

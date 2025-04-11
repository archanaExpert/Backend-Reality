const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadWeb = multer({ storage });
router.post('/', uploadWeb.single('webgl'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  } else {
    res.status(400).json({ message: 'No file uploaded.' });
  }
});

module.exports = router;


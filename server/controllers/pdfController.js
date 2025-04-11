const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const axios=require('axios');
const fs=require('fs');
const getGFS = () => gfs;
let gfs;

const connectDBPdf = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  gfs = Grid(conn.connection.db, mongoose.mongo);
  gfs.collection('pdfs');
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, `pdf-${Date.now()}-${file.originalname}`);
  }
});
const uploadPDF = multer({ storage });
const uploadPDFHandler = (req, res) => {
  res.json({ msg: "PDF uploaded", file: req.file });
};


const getPDFStream = (req, res) => {
  const { filename } = req.params;

  gfs.files.findOne({ filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No PDF found' });
    }

    if (file.contentType !== 'application/pdf') {
      return res.status(400).json({ err: 'File is not a PDF' });
    }

    const readStream = gfs.createReadStream({ filename });
    res.set('Content-Type', 'application/pdf');
    readStream.pipe(res);
  });
};

module.exports = { uploadPDF, uploadPDFHandler, getPDFStream, connectDBPdf };

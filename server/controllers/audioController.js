const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const axios=require('axios');
const fs=require('fs');
const getGFS = () => gfs;
let gfs;

const connectDBAudio = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  gfs = Grid(conn.connection.db, mongoose.mongo);
  gfs.collection('audios');
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, `audio-${Date.now()}-${file.originalname}`);
  }
});

const uploadAudio = multer({ storage });
const uploadAudioHandler = (req, res) => {
  res.json({ msg: "Audio uploaded", file: req.file });
};

const streamAudio = (req, res) => {
  const { filename } = req.params;
  gfs.files.findOne({ filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No file found' });
    }
    if (file.contentType.startsWith('audio')) {
      const readstream = gfs.createReadStream({ filename });
      res.set('Content-Type', file.contentType);
      readstream.pipe(res);
    } else {
      res.status(400).json({ error: 'Not an audio file' });
    }
  });
};

const listAudioFiles = (req, res) => {
  gfs.files.find({ 'metadata.type': 'audio' }).toArray((err, files) => {
    if (!files || files.length === 0) return res.json([]);
    res.json(files);
  });
};

module.exports = {  connectDBAudio,uploadAudio,getGFS,uploadAudioHandler, streamAudio, listAudioFiles };

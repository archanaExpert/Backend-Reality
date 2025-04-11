const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const fs = require('fs');
let gfs;

const getGFS = () => gfs;
const connectDBVideo = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  gfs = Grid(conn.connection.db, mongoose.mongo);
  gfs.collection('videos');
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, `video-${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
const uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({msg: "Video uploaded successfully (to local disk)",file: req.file});
};


const getVideoStream = async (req, res) => {
  try {
    const { filename } = req.params;

    const files = await gridFSBucket.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No file found' });
    }
    res.set('Content-Type', files[0].contentType || 'video/mp4');
    const readStream = gridFSBucket.openDownloadStreamByName(filename);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error streaming video' });
  }
};

module.exports = {upload,connectDBVideo,getGFS,uploadVideo,getVideoStream};

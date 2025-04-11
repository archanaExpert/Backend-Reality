const express = require('express');
const router = express.Router();
const {upload,uploadVideo,getVideoStream} = require('../controllers/videoController');

router.post('/upload', upload.single('video'), uploadVideo);
router.post('/stream/:filename', getVideoStream);

module.exports = router;

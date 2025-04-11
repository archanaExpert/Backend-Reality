const express = require('express');
const router = express.Router();

const {

  uploadAudioHandler,
  streamAudio,
  listAudioFiles,
  uploadAudio
} = require('../controllers/audioController');


router.post('/upload', uploadAudio.single('audio'), uploadAudioHandler);
router.get('/stream/:filename', streamAudio);
router.get('/all', listAudioFiles);

module.exports = router;

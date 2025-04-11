const express = require('express');
const {uploadPDFHandler,getPDFStream,uploadPDF} = require('../controllers/pdfController');

const router = express.Router();

router.post('/upload', uploadPDF.single('pdf'), uploadPDFHandler);
router.get('/stream/:filename', getPDFStream);

module.exports = router;

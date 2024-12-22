const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// Upload File
router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);

// Get All Files
router.get('/',authMiddleware, fileController.getFiles);

// Download file
router.get('/download/:id', fileController.downloadFile);

router.delete('/delete/:id', fileController.deleteFile)

module.exports = router;

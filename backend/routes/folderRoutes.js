const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const folderController = require('../controllers/folderController');

const router = express.Router();

router.post('/create',authMiddleware,folderController.createFolder);
router.get('/', authMiddleware, folderController.getFolders); // Add this route

module.exports = router;

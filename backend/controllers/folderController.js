const folderService = require('../services/folderService');

exports.createFolder = async (req, res, next) => {
  try {
    const folder = await folderService.createFolder(req.body, req.user);
    res.status(201).json(folder);
  } catch (error) {
    next(error);
  }
};

exports.getFolders = async (req, res) => {
  try {
    const parentFolder = req.query.parentFolder || null;
    const folders = await folderService.getFoldersByUser(req.user, parentFolder);
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

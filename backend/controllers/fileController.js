const fileService = require('../services/fileService');

exports.uploadFile = async (req, res, next) => {
  try {
    const file = await fileService.uploadFile(req.file, req.body.folderId, req.user);
    res.status(201).json(file);
  } catch (error) {
    next(error);
  }
};

exports.getFiles = async (req, res, next) => {
  try {
    const files = await fileService.getFiles(req.user);
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    await fileService.downloadFile(req.params.id, res);
  } catch (error) {
    next(error);
  }
};

exports.deleteFile = async(req, res, next) =>{
  try {
    await fileService.deleteFile(req.params.id, req.user);
    res.status(200).json("successfully Deleted");
  } catch (error) {
    next(error);
  }
}
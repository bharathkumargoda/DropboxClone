// storage/simpleMongoStorage.js
const StorageInterface = require('./interfaces/storageInterface');
const File = require('../models/File');
const FileData = require('../models/FileData');
const mongoose = require('mongoose');


class SimpleMongoStorage extends StorageInterface {
  constructor() {
    super();
  }

  async uploadFile(file, user, folderId) {
    // Step 1: Create the File metadata document with 'path' temporarily set to null
    const newFile = new File({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      user: user.id, // Associate with user
      folder: folderId, // Associate with folder if provided
      path: null, // To be updated after storing binary data
    });
    const savedFile = await newFile.save();

    // Step 2: Store the binary data in FileData collection
    const fileData = new FileData({
      fileId: savedFile._id,
      data: file.buffer,
    });
    await fileData.save();

    // Step 3: Update the File document's 'path' to reference FileData
    savedFile.path = fileData._id;
    await savedFile.save();

    return savedFile; 
  }

  async downloadFile(fileId) {
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    const fileData = await FileData.findOne({ fileId });
    if (!fileData) {
      throw new Error('File data not found');
    }

    return { metadata: file, data: fileData.data };
  }

  async deleteFile(fileId, user) {
    await FileData.deleteOne({ fileId });
    await File.deleteOne({ _id: fileId });
  }
}

module.exports = new SimpleMongoStorage();

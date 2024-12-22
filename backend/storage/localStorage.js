const StorageInterface = require('./interfaces/storageInterface');
const path = require('path');
const fs = require('fs');

class LocalStorage extends StorageInterface {
  uploadFile(file) {
    const filePath = path.join(__dirname, '../uploads', file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    return { path: filePath, filename: file.originalname };
  }

  downloadFile(filePath) {
    return fs.createReadStream(filePath);
  }

  deleteFile(filePath) {
    fs.unlinkSync(filePath);
  }
}

module.exports = LocalStorage;

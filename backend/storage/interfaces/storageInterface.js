class StorageInterface {
  uploadFile(file) {
    throw new Error("uploadFile not implemented");
  }
  downloadFile(fileId) {
    throw new Error("downloadFile not implemented");
  }
  deleteFile(fileId) {
    throw new Error("deleteFile not implemented");
  }
}

module.exports = StorageInterface;

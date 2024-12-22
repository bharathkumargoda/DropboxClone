const StorageInterface = require('./interfaces/storageInterface');
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const { Readable } = require('stream');

class MongoStorage extends StorageInterface {
  constructor() {
    super();
    this.gfs = null;

    // Initialize GridFS after the MongoDB connection is established
    mongoose.connection.once('open', () => {
      this.gfs = gridfs(mongoose.connection.db, mongoose.mongo);
      this.gfs.collection('uploads'); // Name of the GridFS bucket
      console.log('GridFS initialized');
    });
  }


  async uploadFile(file) {
    if (!this.gfs) {
      throw new Error('GridFS is not initialized');
    }

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null); // Indicate end of the stream

    return new Promise((resolve, reject) => {
      const writeStream = this.gfs.createWriteStream({
        filename: file.originalname,
        content_type: file.mimetype,
      });

      readableStream.pipe(writeStream);

      writeStream.on('close', (storedFile) => {
        resolve({
          id: storedFile._id,
          filename: storedFile.filename,
          contentType: storedFile.contentType,
        });
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  downloadFile(fileId) {
    if (!this.gfs) {
      throw new Error('GridFS is not initialized');
    }

    try {
      return this.gfs.createReadStream({ _id: fileId });
    } catch (error) {
      throw new Error(`Error downloading file: ${error.message}`);
    }
  }

  async deleteFile(fileId) {
    if (!this.gfs) {
      throw new Error('GridFS is not initialized');
    }

    return new Promise((resolve, reject) => {
      this.gfs.remove({ _id: fileId, root: 'uploads' }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = new MongoStorage();

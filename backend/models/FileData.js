const mongoose = require('mongoose');

const fileDataSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'File' },
  data: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('FileData', fileDataSchema);

const File = require('../models/File');
// const mongoStorage = require('../storage/mongoStorage');
// const localStorage = require('../storage/localStorage');
// const s3Storage = require('../storage/s3Storage');
const simpleMongoStorage = require('../storage/simpleMongoStorage');

const mimeTypes = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'text/plain': 'TXT',
  'text/csv': 'CSV',
  'text/html': 'HTML',
  'application/json': 'JSON',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-excel': 'XLS',
  'audio/mpeg': 'MP3',
  'audio/wav': 'WAV',
  'application/zip': 'ZIP',
  'application/octet-stream': 'Binary'
};


const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

exports.uploadFile = async (file, folderId, user) => {
  const storedFile = await simpleMongoStorage.uploadFile(file, user, folderId);
  return storedFile;
};

exports.downloadFile = async (fileId, res) => {
  const { metadata, data } = await simpleMongoStorage.downloadFile(fileId);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // res.setHeader('Content-Disposition', `attachment; filename="${metadata.name}"`);
  // res.setHeader('Content-Disposition', `inline; filename="${metadata.name}"`);
  res.setHeader('Content-Type', metadata.type);
  res.send(data);
};

exports.getFiles = async (user) => {
  const files =  await File.find({ user: user.id });
  const processedFiles = files.map((file) => ({
    _id: file._id,
    name: file.name,
    type: mimeTypes[file.type] || 'Unknown',
    size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
    createdAt: formatDate(file.createdAt), // Format the date
  }));

  return processedFiles;
};

exports.deleteFile = async (fileId, user) => {
  return await simpleMongoStorage.deleteFile(fileId, user);
};

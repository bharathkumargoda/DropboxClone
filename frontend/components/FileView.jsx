import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadFile } from '../services/FileService';

const FileView = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('asdf');
  const [fileType, setFileType] = useState('image/png');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await downloadFile(fileId);
      
        const blobURL = URL.createObjectURL(response.data);
        console.log(blobURL);
        // if (!metadataResponse.ok) {
        //   throw new Error('Failed to fetch file metadata');
        // }

        // const metadata = await metadataResponse.json();
        // setFileName(metadata.name);
        // setFileType(metadata.type);
        setFileData(blobURL);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFile();
  }, [fileId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fileData) {
    return <div>Loading file...</div>;
  }

  // Render based on file type
  return (
    <div>
      <h2>{fileName}</h2>
      {fileType.startsWith('image/') ? (
        <img src={fileData} alt={fileName} style={{ maxWidth: '100%' }} />
      ) : fileType === 'application/pdf' ? (
        <iframe src={fileData} type="application/pdf" width="100%" height="600px" />
      ) : (
        <div>Unsupported file type for preview</div>
      )}
    </div>
  );
};

export default FileView;

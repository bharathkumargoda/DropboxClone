import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadFile } from '../services/FileService';

const FileView = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileContent, setFileContent] = useState(null); // To store the file content (for text-based files)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await downloadFile(fileId);
        
        // Assuming the metadata comes with the file response
        const fileTypeFromHeader = response.headers['content-type'];
        console.log("reponse",fileTypeFromHeader );

        setFileType(fileTypeFromHeader);  

        const blobURL = URL.createObjectURL(response.data);

        if (fileTypeFromHeader === 'text/plain' || fileTypeFromHeader === 'text/csv') {
          // For text and CSV files, we'll read and display content
          const textContent = await response.data.text(); // Use text() to extract text content from the blob
          setFileContent(textContent);
        } else {
          setFileData(blobURL);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFile();
  }, [fileId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fileData && !fileContent) {
    return <div>Loading file...</div>;
  }

  // Render based on file type
  return (
    <div>
      {fileType.startsWith('image/') ? (
        <img src={fileData} alt={"image"} style={{ maxWidth: '100%' }} />
      ) : fileType === 'application/pdf' ? (
        <iframe src={fileData} type="application/pdf" width="100%" height="800px" />
      ) : fileType === 'text/plain' || fileType === 'text/csv' ? (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{fileContent}</pre> // Display content for text/csv
      ) : fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword' ? (
        <iframe 
          src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileData)}`} 
          width="100%" 
          height='800px'
          title="Word Document"
        />
      ) : fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel' ? (
        <iframe 
          src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileData)}`} 
          width="100%" 
          height="800px" 
          title="Excel Spreadsheet"
        />
      ) : (
        <div>Unsupported file type for preview</div>
      )}
    </div>
  );
};

export default FileView;

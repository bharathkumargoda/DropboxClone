import React, { useState , useContext} from 'react';
import { Button, Typography } from '@mui/material';
import { uploadFile, fetchFiles } from '../services/FileService';
import { validateFile } from '../utils/fileValidator';
import LoaderContext from '../contexts/LoaderContext';


const FileUpload = ({ setFiles}) => {
  const [error, setError] = useState('');
  const {isLoading, setIsLoading} = useContext(LoaderContext)

  const handleUpload = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
          setIsLoading(false);
        return;
      }

      try {
        await uploadFile(file); // Upload the file
        const updatedFiles = await fetchFiles(); // Refresh the file list
        setFiles(updatedFiles);
      } catch (err) {
        setError('Upload failed. Please try again.');
        console.error('Upload failed:', err);
      }
    }
    setIsLoading(false);

  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        sx={{
          maxHeight: '40px',
          alignSelf: 'flex-end',
          marginRight: '230px'
        }}
      >
        Upload
        <input
          type="file"
          hidden
          onChange={handleUpload}
          accept="application/pdf, image/jpeg, image/png, text/plain, text/csv, text/html, application/json, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, audio/mpeg, application/zip"
        />
      </Button>

      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: 8 }}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default FileUpload;

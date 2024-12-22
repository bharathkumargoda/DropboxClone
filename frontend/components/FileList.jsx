import React, {useState, useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { deleteFile, downloadFile } from '../services/FileService';
import { useNavigate } from 'react-router-dom';
import LoaderContext from '../contexts/LoaderContext';

const FileList = ({ filteredFiles, setFiles }) => {

  const navigate = useNavigate();
  const {isLoading, setIsLoading} = useContext(LoaderContext);
    
  const handleDelete = async (fileId) => {
    setIsLoading(true);
    await deleteFile(fileId);
    console.log("file ID", fileId);
    const updatedFiles = filteredFiles.filter((file) => file._id !== fileId); // Remove file from state
    console.log("Updated Files", updatedFiles);
    setFiles(updatedFiles);
    setIsLoading(false);
  };

  const handleDownload = async (fileId, fileName) => {
    setIsLoading(true);
    const response = await downloadFile(fileId);
    const blobURL = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);
    setIsLoading(false);
  };

  const columns = [
    { 
        field: 'name',
        headerName: 'File Name', 
        flex: 2,
        minWidth: 300,
        maxWidth: 400, // Restrict max width
        sortable: true,
        renderCell: (params) => (
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={params.row.name}>
            {params.row.name}
          </div>
        ),
    },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'createdAt', headerName: 'Uploaded Date', width: 190 },
    { field: 'size', headerName: 'Size (MB)', width: 150},
    {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        sortable: false,
        filter : false,
        renderCell: (params) => (
          <>
            <Button onClick={() => handleDownload(params.row._id,params.row.name)} style={{ marginRight: '0.5rem' }}>
              Download
            </Button>
            <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
            <Button onClick={() => navigate(`/files/${params.row._id}`)}>View</Button>
          </>
        ),
      },
  ];

  return (
    <Box
      sx={{
        width: '80%',
        margin: '0 auto', // Center the grid horizontally
        marginTop: '20px',
      }}
    >
      <DataGrid
        rows={filteredFiles}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15, 20]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </Box>
  
  );
};

export default FileList;

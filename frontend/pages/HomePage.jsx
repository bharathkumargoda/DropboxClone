import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import FileList from '../components/FileList';
import Navbar from '../components/Navbar';
import LoaderContext from '../contexts/LoaderContext';
import { fetchFiles } from '../services/FileService';
import FileUpload from '../components/FileUpload';

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  // Fetch files from the server
  const fetchFileData = async () => {
    setIsLoading(true);
    const fileList = await fetchFiles();
    setFiles(fileList);
    setIsLoading(false);
  };

  useEffect(() => {
    setFilteredFiles(files);
  }, [files])
  

  // Format the total file size in MB
  const totalFileSize = files.length === 0 ? 0 : (files.reduce((acc, file) => acc + parseFloat(file.size), 0.0)).toFixed(2);

  // Handle file search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === '') {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter(file => file.name.toLowerCase().includes(query));
      setFilteredFiles(filtered);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {/* Metrics */}
        <div className="metrics-container">
          <div className="metric">
            <h3>Total Files</h3>
            <p>{files?.length}</p>
          </div>
          <div className="metric">
            <h3>Total File Size</h3>
            <p>{totalFileSize} MB</p>
          </div>
        </div>

        {/* Search and Upload Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          {/* Search Bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search files..."
            onChange={handleSearch}
            style={{ marginLeft: '180px', width : '250px' , height : '30px'}}
          />
          {/* File Upload */}
          <FileUpload setFiles={setFiles} setFilteredFiles={setFilteredFiles} />
        </Box>

        <FileList filteredFiles={filteredFiles} setFiles={setFiles} />
      </div>
    </>
  );
};

export default HomePage;

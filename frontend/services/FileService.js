import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_FILES_URL || 'http://localhost:5000/api/files';
console.log(API_URL);

const token = localStorage.getItem('jwtToken');

export const fetchFiles = async () => {
  try {
    const response = await axios.get( API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching files', error);
    return [];
  }
};



export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response;

  } catch (error) {
    console.error('File upload failed', error);
  }
};




export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error deleting file', error);
  }
};




export const downloadFile = async (fileId) => {
  if (!token) {
    throw new Error('No authentication token found');
  }
  try {
    // Make a GET request to the download endpoint with token in the headers
    const url = `${API_URL}/download/${fileId}`;
    const reqbod = {
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: { 'Authorization': `Bearer ${token}`}
    }
    const response = await axios(reqbod);
    return response;
    
  } catch (error) {
    console.error('Error downloading the file:', error);
    throw new Error('Failed to download file');
  }
};

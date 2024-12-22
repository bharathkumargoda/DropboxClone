# File Management System

This project is a web-based file management system built using React and Node.js. It allows users to upload, preview, download, and delete files, with functionalities for user authentication and metrics tracking.

## Features

- **User Authentication:** Secure login using JWT.
- **File Upload:** Supports various file types (PDF, images, text files, etc.) with type and size validations.
- **File Management:** Preview, download, and delete files.
- **Metrics Dashboard:** Displays total files and file sizes.

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** React Context API

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (locally or cloud-hosted)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/bharthkumargoda/DropboxClone.git
   cd DropboxClone
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create environment files:
   - **Backend: `/backend/.env`**
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     ```
   - **Frontend: `/frontend/.env`**
     ```env
    VITE_BACKEND_FILES_URL = 'http://localhost:5000/api/files'
    VITE_BACKEND_AUTH_URL = 'http://localhost:5000/api/auth'
     ```
   Ensure that frontend .env starts with VITE_

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

## File Structure

### Backend
```
backend/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
```

## Usage

1. **Login:** Start by logging in with your credentials.
2. **Upload Files:** Use the upload button to upload files. Only allowed file types and sizes are accepted.
3. **Manage Files:**
   - Search files using the search bar.
   - Upload the supported files.
   - Download files directly from the file list.
   - Delete files to free up storage.
   - View file details in a preview or dedicated page.
4. **Metrics:** Monitor the total number of files and their cumulative size.

## Supported File Types
- PDF, PNG
- Plain Text (.txt), CSV, HTML
- JSON, Microsoft Word (.doc, .docx), Excel (.xls, .xlsx)
- MP3, ZIP

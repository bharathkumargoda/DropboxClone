import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import FileView from './components/FileView';
import LoaderContext from './contexts/LoaderContext';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        {isLoading ? <Loader /> : null}
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protect the dashboard and file view routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/files/:fileId"
              element={
                <ProtectedRoute>
                  <FileView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </LoaderContext.Provider>
  );
};

export default App;

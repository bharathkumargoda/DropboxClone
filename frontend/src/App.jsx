import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FileView from './components/FileView';
import UserContext from './contexts/UserContext';
import LoaderContext from './contexts/LoaderContext';
import Loader from './components/Loader';

const App = () => {

  const [Userdata, setUserdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (

    <UserContext.Provider value={{ Userdata, setUserdata }}>
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading? <Loader/> : null }
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/files/:fileId" element={<FileView />} />
        </Routes>
      </Router>
    </LoaderContext.Provider>
    </UserContext.Provider>
  );
};

export default App;

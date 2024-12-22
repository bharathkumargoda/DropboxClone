// /components/Loader.js
import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const Loader = () => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;

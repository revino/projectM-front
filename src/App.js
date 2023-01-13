import './App.css';
import React,{Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

//
import { router } from './routes';
import theme from './theme';

import { ThemeProvider } from '@mui/system';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {

  return (
    <ThemeProvider theme={theme} >
      <Suspense fallback={
        <Backdrop
          sx={{ color: (theme) => theme.palette.background, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }>
      <RouterProvider router = {router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

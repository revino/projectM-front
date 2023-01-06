
import React, { useEffect } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/modules/user';

export default function LoginRedirectView(props) {

  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.clear();
    localStorage.removeItem('AUTH-TOKEN');
    dispath(logout())
    navigate('/login');
  },[dispath, navigate]);

  return(
    <Backdrop open sx={{
      zIndex: (theme)=> theme.zIndex.drawer + 1,
      color: '#fff',
    }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
};

  

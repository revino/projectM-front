import React, { useEffect } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';
import { getUserAsync } from '../redux/modules/user';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoogleRedirectView(props) {

  const [searchParams] = useSearchParams();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const {isError, isUserInfo} = useSelector((state)=>({
    isError: state.user.isError,
    isUserInfo: state.user.isUserInfo,
  }), shallowEqual);

  useEffect(()=>{
    const accessToken = searchParams.get('accessToken');
    if(!!accessToken) {
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      dispath(getUserAsync());
    } 
    
  },[searchParams, dispath])

  useEffect(()=>{
    if(isError){
      navigate('/login');
    }
  },[isError, navigate]);

  useEffect(()=>{
    if(isUserInfo){
      navigate('/');
    }
  },[isUserInfo, navigate]);

  return(
    <Backdrop open sx={{
      zIndex: (theme)=> theme.zIndex.drawer + 1,
      color: '#fff',
    }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
};

  

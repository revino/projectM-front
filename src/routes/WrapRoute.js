
import { Backdrop, CircularProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { Fragment, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAsync } from '../redux/modules/user';

const Loading = () => (
  <Backdrop open sx={{
      zIndex: (theme)=> theme.zIndex.drawer + 1,
      color: '#fff',
    }}>
      <CircularProgress color="inherit" />
  </Backdrop>
)

function WrapRoute(props){
  const { Wrap, Component, allow, ...el} = props;
  const dispath = useDispatch();
  const navigate = useNavigate();

  const {isFetching, isUserInfo, isError} = useSelector((state)=>({
    isUserChannelFetching: state.user.isUserChannelFetching,
    isUserInfo: state.user.isUserInfo,
    isError: state.user.isError,
  }), shallowEqual);

  const token = localStorage.getItem("ACCESS_TOKEN");  

  const reqeustUserInfoCon = !allow && !isUserInfo && !isFetching && !!token
  const redirectCon = (!allow && !token) || isError;
  const loadingCon = !allow && !isUserInfo && !isError;

  useEffect(()=>{
    if(redirectCon){
      navigate('/login');
    }
  },[redirectCon, navigate])
  
  useEffect(()=>{
    if(reqeustUserInfoCon && !isError ){
      dispath(getUserAsync());
    }
  },[reqeustUserInfoCon, isError, token, dispath])
  
  return (
    loadingCon? <Loading/> :
    <Fragment>
      <Wrap>
        <SnackbarProvider maxSnack={5} preventDuplicate autoHideDuration={3000}>
          <Component {...el} />
        </SnackbarProvider>
      </Wrap>
    </Fragment>
  )
}

export default WrapRoute;
import React, { useEffect, useState } from 'react';

import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { styled, useTheme } from '@mui/system';

import { Formik } from "formik"
import * as Yup from 'yup';
import { BASE_URL } from '../../api/setting';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUserAsync, requestLoginAsync } from '../../redux/modules/user';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const Root = styled('div')(({theme})=>({
}))

const Content = styled('div')(({theme})=>({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}))

const ContentHeader = styled('div')(({theme})=>({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 2, 0),
  padding: theme.spacing(2, 2, 0),
}))

const ContentBody = styled('div')(({theme})=>({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2, 2, 0),
  padding: theme.spacing(2, 2, 0),
}))

const Form = styled('form')(({theme})=>({
  width: '450px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
}))

const GOOGLE_HREF = `${BASE_URL}/oauth2/authorize/google?redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

export default function Login(props) {
  
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const [isLoading, setLoading] = useState(false);

  const {isUserLoginFetching, isLogin, isUserInfo, isError} = useSelector((state)=>({
    isUserLoginFetching: state.user.isUserLoginFetching,
    isLogin: state.user.isLogin,
    isUserInfo: state.user.isUserInfo,
    isError: state.user.isError,
  }), shallowEqual);

  const handleGoogleLogin = async() => {
    setLoading(true);
    window.location.href = GOOGLE_HREF;
  }

  const handleSubmit = async(e) => { 
    dispatch(requestLoginAsync({
      email: e.email,
      password: e.password,
    }));
  };

  useEffect(() =>{
    setLoading(isUserLoginFetching);
  }, [isUserLoginFetching])

  useEffect(() =>{
    if(isLogin){
      enqueueSnackbar('로그인 성공', { variant: 'success' } );
      dispatch(getUserAsync());
    }
  }, [isLogin, enqueueSnackbar, dispatch])

  useEffect(() =>{
    if(isError){
      enqueueSnackbar('로그인 실패. 아이디, 패스워드를 확인해주세요', { variant: 'error' } ); 
    }
  }, [isError, enqueueSnackbar])

  useEffect(()=>{
    if(isUserInfo){
      navigate('/');
    }
  },[isUserInfo, navigate]);

  return (
    <Root>
      <Backdrop open={isLoading} sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: (theme) => theme.palette.background
      }}>
        <CircularProgress color='inherit'/>
      </Backdrop>
      <Content>
        <ContentHeader>
          <Typography
            color="textPrimary"
            variant="h2"
          >
            로그인
          </Typography>
        </ContentHeader>
        <ContentBody>
          <Typography>
            테스트 계정: test@test.com 패스워드 : 123456
          </Typography>
          <Formik
            initialValues={{
              email: 'test@test.com',
              password: '12345'
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })
            }
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="이메일 주소"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="비밀번호"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  로그인
                </Button>
              </Form>
            )}
          </Formik>

          <Button
            color='secondary'
            fullWidth
            startIcon={<Google sx={{marginRight: (theme)=>theme.spacing(1)}}/>}
            onClick={handleGoogleLogin}
            size="large"
            variant="contained"
            sx={{
              margin: theme.spacing(2,0),
              width: '450px',
              [theme.breakpoints.down('md')]: {
                width: '100%'
              },
            }}
          >
            구글 로그인
          </Button>
            
        </ContentBody>
      </Content>
    </Root>
  );
}
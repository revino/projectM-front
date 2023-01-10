import React, { useState } from 'react';

import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { styled, useTheme } from '@mui/system';

import { Formik } from "formik"
import * as Yup from 'yup';
import { BASE_URL } from '../../api/setting';


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

  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();

  const handleSubmit = async(e) => { 
    setLoading(true);
    //requestLogin({isLoginType:'email', email:e.email, password:e.password});
    setLoading(false);
  };

  return (
    <Root>
      <Backdrop open={isLoading} sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff'}}>
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
          <Formik
            initialValues={{
              email: 'test@test.com',
              password: '123456'
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
            href={GOOGLE_HREF}
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
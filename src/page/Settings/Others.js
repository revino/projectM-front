import React, { useEffect } from 'react'

import { styled } from '@mui/system'
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Switch, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { CloudUpload } from '@mui/icons-material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setUserSettingAsync } from '../../redux/modules/user';
import { useSnackbar } from 'notistack';

const Root = styled('div')(({theme})=>({
  height: '100%'
}))

export default function Others(props) {

  const {isSlackWebHook, slackWebHookUrl, isUserSettingFetching, isError} = useSelector((state)=>({
    isSlackWebHook: state.user.setting.isSlackWebHook,
    slackWebHookUrl: state.user.setting.slackWebHookUrl,
    isUserSettingFetching: state.user.isUserSettingFetching,
    isError: state.user.isError,
  }), shallowEqual);

  const dispathch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async(e) => { 
    const data = { 
      isSlackWebHook: e.isSlackWebHook,
      slackWebHookUrl: e.slackWebHookUrl
    }
    dispathch(setUserSettingAsync(data))    
  };

  const formik = useFormik({
    initialValues : {
      isSlackWebHook: isSlackWebHook,
      slackWebHookUrl: slackWebHookUrl,
    },
    validationSchema : 
      Yup.object().shape({
        slackWebHookUrl: Yup.string().url()
      })
    ,
    onSubmit : handleSubmit
  });

  useEffect(() =>{
    if(isUserSettingFetching && !isError){
      enqueueSnackbar('설정 성공', { variant: 'success' } ); 
    }
  }, [isUserSettingFetching, isError, enqueueSnackbar])
  
  return (
    <Root>
      <Grid container spacing={4} sx={{
        padding: (theme)=> theme.spacing(2),
        paddingLeft: (theme)=> theme.spacing(0),
        paddingRight: (theme)=> theme.spacing(0),
        width: '100%'
      }}>
        <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
            <form  onSubmit={formik.handleSubmit}>
            <FormControl 
              variant="standard" 
              sx={{ width: '100%', display: 'block'}}
            >
              <FormLabel > Slack 알림 설정</FormLabel>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      id='isSlackWebHook'
                      checked={formik.values.isSlackWebHook}
                      onChange={formik.handleChange}
                    />
                  } 
                  label={formik.values.isSlackWebHook? "ON" : "OFF"} 
                />
                <TextField
                  id='slackWebHookUrl'
                  value={formik.values.slackWebHookUrl}
                  onChange={formik.handleChange}
                  label="Slack Webhook URL"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={formik.touched.slackWebHookUrl && Boolean(formik.errors.slackWebHookUrl)}
                  helperText={formik.touched.slackWebHookUrl && formik.errors.slackWebHookUrl}
                  variant="standard"
                  sx={{ 
                    display: formik.values.isSlackWebHook? "inline-flex;" : 'none'
                  }}
                />
              </FormGroup>
              <Button
                startIcon={<CloudUpload />}
                color="primary"
                disabled={formik.isSubmitting}
                type="submit"
                variant="outlined"
                size='large'
                sx={{ mt: 1, mr: 1 }} 
              >
                저장
              </Button>
            </FormControl>
            </form >
            
        </Grid>
      </Grid>
    </Root>
  )
}
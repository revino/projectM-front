import React, {useState} from 'react';

//Material UI
import 'date-fns';
import useInput from '../../hooks/useInput'

//
import API from '../../api/setting';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';


export default function ChannelSubscribe(props) {
  
  //input
  const [channelId, onChangeChannelId] = useInput({initialValue:""});

  //error
  const [selectError,setSelectError] = useState({});
  const {enqueueSnackbar} = useSnackbar();

  const checkForm = ()=>{
    const selectState = {channel_id:channelId === ''};
    const selectError = Object.values(selectState).some((el)=> el===true);

    if(selectError) {
      setSelectError({...selectState});
    }

    return selectError;
  }

  const handleSubmit= async (event) => {
    
    if(checkForm()) {
      enqueueSnackbar('양식을 확인 해주세요.', { variant: 'error' } ); 
      return;
    }
    
    const inputValue = {id:channelId}

    //
    try {
      await API.channel.subscribeChannel({
        id: inputValue.id,
      })
  
      props.handleClose();
      event.preventDefault();
      
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }

  }
  
  return (
    <React.Fragment>
      <Typography variant="h2"
        sx={{
          margin: (theme)=>theme.spacing(1),
        }}
      >
        채널 구독
      </Typography>

      <Grid container
        sx={{
          margin: (theme)=>theme.spacing(1),
        }}
      >
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <TextField error={selectError.channel_id} 
            id="channel id" label="채널 아이디" helperText="채널 아이디" variant="standard" type='number'
            value={channelId} onChange={onChangeChannelId}
            sx={{
              margin: (theme)=>theme.spacing(1),
              width: "98%"

            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={handleSubmit}
          sx={{
            margin: (theme)=>theme.spacing(1),
            width: "100%"
          }}
        >추가
        </Button>
      </Grid>

    </React.Fragment>
  );
}

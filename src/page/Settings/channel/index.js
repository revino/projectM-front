import React, { useCallback, useEffect, useState } from 'react'

import { styled } from '@mui/system'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserChannelAsync } from '../../../redux/modules/user'

import API from '../../../api/setting';
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { ArrowBack, Delete, SyncAlt } from '@mui/icons-material'
import { useSnackbar } from 'notistack'


const Root = styled('div')(({theme})=>({
  height: '100%',
  margin: theme.spacing(2),
}))

const feilds = [
  { id: 'id'          , label: '아이디', type:'text', readOnly: true, disabled: true},
  { id: 'name'        , label: '이름' , type:'text', readOnly: false, disabled: false},
  { id: 'managerEmail', label: '관리자', type:'text', readOnly: true, disabled: true},
  { id: 'createdAt'   , label: '생성일', type:'datetime-local', readOnly: true, disabled: true},
];

export default function ChannelUpdate(props) {

  const {channelId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const {currentChannel} = useSelector((state)=>({
    currentChannel: state.user.channel.currentChannel,
  }), shallowEqual);

  const [channelInfo, setChannelInfo] = useState(null);
  const [selectError,setSelectError] = useState({});
  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    managerEmail: '',
    createdAt: '',
  });

  const onChange = e => {
    setInputs({
        ...inputs,
        [e.target.id]: e.target.value
    });
  };

  const ChaneelInfoCallback = useCallback(async () =>{
    const response = await API.channel.getChannel({
      id: channelId,
    });

    const data = response.data.data;
    
    setChannelInfo(data);

    setInputs({
      id: data.id,
      name: data.name,
      managerEmail: data.managerEmail,
      createdAt: data.createdAt.slice(0,16),
    })

  }, [channelId, setChannelInfo]);

  const handleChannelRemove = async (id) =>{

    await API.channel.deleteChannel({
      id : id,
    })
    
    dispatch(getUserChannelAsync());

    navigate('/settings')

  }

  const checkForm = ()=>{
    const selectState = {
      name: inputs.name === '',
    };

    const selectError = Object.values(selectState).some((el)=> el===true);

    if(selectError) {
      setSelectError({...selectState});
    }

    return selectError;
  }

  const handleChannelUpdate = async (id) =>{

    if(checkForm()) {
      enqueueSnackbar('양식을 확인 해주세요.', { variant: 'error' } ); 
      return;
    }
    const inputValue = {
      id: id,
      name:inputs.name,
    }

    try {
      await API.channel.updateChannel(inputValue)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }
    
    dispatch(getUserChannelAsync());

    navigate('/settings')

  }

  const handleBack =() =>{
    navigate(-1);
  }

  useEffect(() =>{
    ChaneelInfoCallback()
  }, [ChaneelInfoCallback])

  return (
    <Root>
      <IconButton size='large' color="primary" aria-label="back" onClick={handleBack}>
        <ArrowBack></ArrowBack>
      </IconButton>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
          <Button 
            variant="outlined" size="large" color="primary" 
            onClick={handleChannelUpdate.bind(handleChannelUpdate, channelId)} 
            startIcon={<SyncAlt/>} 
            sx={{
              margin: (theme)=> theme.spacing(1)
            }}  
          >
            업데이트
          </Button>
          <Button 
            disabled={!!currentChannel && currentChannel.id === channelId * 1} 
            variant="outlined" size="large" color="secondary" 
            onClick={handleChannelRemove.bind(handleChannelRemove, channelId)} 
            startIcon={<Delete/>} 
            sx={{
              margin: (theme)=> theme.spacing(1)
            }}  
          >
            삭제
          </Button>
        </Grid>
        
        {!channelInfo? <Typography>loading</Typography> : feilds.map((el) => (
          <Grid key={el.id} item xs={12} sm={4} md={3} lg={3} xl={3}>
            <TextField 
              error={selectError[el.id]}
              key={el.id} id={el.id} label={el.label}
              variant="standard" 
              type={el.type}
              value={inputs[el.id]} 
              onChange={onChange}
              disabled={el.disabled}
              sx={{
                margin: (theme)=>theme.spacing(1),
                width: "100%"
              }}
              InputProps={{
                readOnly: el.readOnly,
              }}
            />
          </Grid>
          ))}
      </Grid>
    </Root>
  )
}
import React, { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/system'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

import AddModal from '../../coponent/AddModal'
import CardButton from '../../coponent/CardButton'
import { getUserChannelAsync } from '../../redux/modules/user'

import API from '../../api/setting';

import ChannelCreate from './ChannelCreate'
import ChannelSubscribe from './ChannelSubscribe'

const Root = styled('div')(({theme})=>({
  height: '100%'
}))

const RefreshButton = styled(Button)(({theme})=>({
  fontWeight: 'bold',
}))

export default function ChannelSetting(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isChannelInfo, channelList, currentChannel} = useSelector((state)=>({
    isChannelInfo: state.user.isChannelInfo,
    channelList: state.user.channel.channelList,
    currentChannel: state.user.channel.currentChannel,
  }), shallowEqual);
  const [createModalOpen, setCreateModalOpen]  = useState(false);
  const [subscriveModalOpen, setSubscriveModalOpen]  = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleCreateClick = () => {setCreateModalOpen(true);}
  const handleSubscribeClick = () => {setSubscriveModalOpen(true);}
  const handleClose = () => {
    setCreateModalOpen(false);
    setSubscriveModalOpen(false);
    dispatch(getUserChannelAsync());
  }

  const handleCardClick = async (id) =>{
    
    try {
      await API.channel.setCurrentChannel({
        id: id,
      })
    }catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }

    dispatch(getUserChannelAsync())
  }
  const handleUnsubscirbeClick = async (id) =>{
    
    if(currentChannel.id === id){
      enqueueSnackbar("현재 채널을 변경해주세요.", { variant: 'error' } ); 
      return;
    }
    try {
      
      await API.channel.unsubscribeChannel({
        id: id,
      })
      dispatch(getUserChannelAsync())

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }
  }
  const handleEditClick = (id) =>{
    navigate('/settings/channel/' + id)
  }

  useEffect(() =>{
    
    if(isChannelInfo){
      setCreateModalOpen(false); 
      setSubscriveModalOpen(false); 
      //enqueueSnackbar('채널 조회 성공', { variant: 'success' } ); 
    }
    
  }, [isChannelInfo, enqueueSnackbar])

  return (
    <Root>
      { createModalOpen    && <AddModal Body={ChannelCreate} open={createModalOpen} handleClose={handleClose}/>}
      { subscriveModalOpen && <AddModal Body={ChannelSubscribe} open={subscriveModalOpen} handleClose={handleClose}/>}
      <Grid container spacing={4} sx={{
        padding: (theme)=> theme.spacing(2),
        paddingLeft: (theme)=> theme.spacing(0),
        paddingRight: (theme)=> theme.spacing(0),
        width: '100%'
      }}>
        <Grid item xs={6} sm={4} md ={2} lg={1.5} xl={1.5}>
          <RefreshButton fullWidth size="large" color = "primary" variant="outlined" onClick={handleCreateClick}>생성</RefreshButton>
        </Grid>

        <Grid item xs={6} sm={4} md ={2} lg={1.5} xl={1.5}>
          <RefreshButton fullWidth size="large" color = "primary" variant="outlined" onClick={handleSubscribeClick}>구독</RefreshButton>
        </Grid>

        <Grid item xs={12} sm={12} md ={12} lg={10} xl={10}>
          {!!channelList && channelList.map( (el, idx) =>{
            return(
            <CardButton
              onClick={handleCardClick.bind(handleCardClick, el.id)}
              key={idx} highlight={!!currentChannel? el.id===currentChannel.id : false} 
              title={el.name} body={el.id} primaryLabel="수정" secondaryLabel="취소" 
              primaryAction={handleEditClick.bind(handleEditClick, el.id)} 
              secondaryAction={handleUnsubscirbeClick.bind(handleUnsubscirbeClick,el.id)} 
            />)
          })}
        </Grid>
      </Grid>
    </Root>
  )
}
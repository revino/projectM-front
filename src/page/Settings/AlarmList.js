import React, { useEffect } from 'react'

import { useSnackbar } from 'notistack'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/system'
import Grid from '@mui/material/Unstable_Grid2';

import CardButton from '../../coponent/CardButton'
import { getAlarmAsync } from '../../redux/modules/user'

import API from '../../api/setting';
import { CircularProgress, Typography } from '@mui/material';

const Root = styled('div')(({theme})=>({
  height: '100%'
}))

export default function AlarmList(props) {

  const dispatch = useDispatch();

  const {isAlarmInfo, alarmItemList} = useSelector((state)=>({
    isAlarmInfo: state.user.isAlarmInfo,
    alarmItemList: state.user.alarm.alarmItemList,
  }), shallowEqual);
  const {enqueueSnackbar} = useSnackbar();

  const handleUnsubscirbeClick = async (id) =>{
    try {
      await API.item.alarmUnsetItem({
        id: id,
      })
      dispatch(getAlarmAsync())

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }
  }

  
  useEffect(() =>{
    dispatch(getAlarmAsync())
  }, [dispatch])


  return (
    <Root>
      <Grid container spacing={4} sx={{
        padding: (theme)=> theme.spacing(2),
        paddingLeft: (theme)=> theme.spacing(0),
        paddingRight: (theme)=> theme.spacing(0),
        width: '100%'
      }}>
        <Grid item xs={12} sm={12} md ={12} lg={10} xl={10}>
          {!isAlarmInfo ? <CircularProgress /> : 
          alarmItemList.length === 0? <Typography> 알람 아이템이 없습니다.</Typography> :
          alarmItemList.map( (el, idx) =>{
            return(
            <CardButton
              key={idx}
              title={`채널 : ${el.channelName}`} body={`아이템 : ${el.name} [id : ${el.id}]`}  secondaryLabel="알림 취소" 
              secondaryAction={handleUnsubscirbeClick.bind(handleUnsubscirbeClick,el.id)} 
            />)
          })}
        </Grid>
      </Grid>
    </Root>
  )
}
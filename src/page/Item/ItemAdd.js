import React, { useState } from 'react';
import dayjs from 'dayjs';

//
import API from '../../api/setting';
import { Button, TextField, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { shallowEqual, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useSnackbar } from 'notistack';

const feilds = [
  { id: 'name'      , label: '이름', helperText: '이름 입력', type:'text'},
  { id: 'status'    , label: '상태',  helperText: '상태 입력', type:'text'},
  { id: 'startDate' , label: '시작일', helperText: '시작일 입력', type:'date'},
  { id: 'endDate'   , label: '종료일', helperText: '종료일 입력', type:'date'},
];

export default function ItemAdd(props) {

  const now = dayjs();
  const {enqueueSnackbar} = useSnackbar();

  const {currentChannel} = useSelector((state)=>({
    currentChannel: state.user.channel.currentChannel,
  }), shallowEqual);
  const [selectError,setSelectError] = useState({});
  
  //
  const [inputs, setInputs] = useState({
    name: '',
    status: '',
    startDate: now.format('YYYY-MM-DD'),
    endDate: now.add(1, 'week').format('YYYY-MM-DD'),
  });

  const onChange = e => {
    setInputs({
        ...inputs,
        [e.target.id]: e.target.value
    });
  };

  const getValue = id => {
    return inputs[id];
  };

  const checkForm = ()=>{
    const selectState = {
      name: inputs.name === '',
      status: inputs.status === '',
      startDate: !inputs.startDate,
      endDate: !inputs.endDate,
    };

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

    const inputValue = {
      name: inputs.name,
      channelId: currentChannel.id,
      status: inputs.status,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
    }

    //
    try {
      await API.item.createItem(inputValue)

      props.handleClose();
      event.preventDefault();
    }
    catch (error){
      enqueueSnackbar(error.response.data.message, { variant: 'error' } ); 
    }
  }
  
  return (
    <React.Fragment>
      <Typography variant="h3" sx={{
        margin: (theme)=>theme.spacing(1),
      }}>
        아이템 생성
      </Typography>
      <Grid container spacing={4} >
        {feilds.map((el) => (
          <Grid key={el.id} item xs={12} sm={12} md={12} lg={6} xl={6}>
            <TextField 
              error={selectError[el.id]}
              key={el.id} id={el.id} label={el.label} helperText={el.helperText} 
              variant="standard" 
              type={el.type}
              value={getValue(el.id)} 
              onChange={onChange}
              sx={{
                margin: (theme)=>theme.spacing(1),
                width: "100%"
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleSubmit}
            sx={{
              fontSize: '1.4em',
            }}
            >생성
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
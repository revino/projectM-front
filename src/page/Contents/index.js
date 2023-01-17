import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, IconButton, Skeleton, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material';
import { Add, AlarmOn, ArrowBack, Delete, QuestionMark, SyncAlt } from '@mui/icons-material';

import API from '../../api/setting';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import StyledAccordion from '../../coponent/StyledAccordion';
import AddModal from '../../coponent/AddModal';
import ContentAdd from './ContentAdd';
import dayjs from 'dayjs';

const Root = styled('div')(({theme})=>({
  height: '100%',
  margin: theme.spacing(2),
}))

const feilds = [
  { id: 'id'         , label: '아이디', type:'text', readOnly: true, disabled: true},
  { id: 'name'       , label: '이름', type:'text', readOnly: false, disabled: false},
  { id: 'status'     , label: '상태', type:'text', readOnly: false, disabled: false},
  { id: 'writerEmail', label: '담당자', type:'text', readOnly: true, disabled: true},
  { id: 'startDate'  , label: '시작일', type:'date', readOnly: false, disabled: false},
  { id: 'endDate'    , label: '종료일', type:'date', readOnly: false, disabled: false},
];

function listSkeleton(count){

  const render = [];

  for (let index = 0; index < count; index++) {
    render.push(
      <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Skeleton variant="rectangular" width='100%'/>
      </Grid> 
    )
  }
  
  return render;

}

export default function Contents(props) {

  const {itemId} = useParams();
  const navigate = useNavigate();

  const [itemInfo, setItemInfo] = useState(null);
  const [contentsInfo, setContentsInfo] = useState(null);
  const [addModalOpen, setAddModalOpen]  = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    status: '',
    writerEmail: '',
    startDate: '',
    endDate: '',
    subscribe: false,
  });
  
  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onChange = e => {
    setInputs({
        ...inputs,
        [e.target.id]: e.target.value
    });
  };

  const ContentsInfoCallback = useCallback(async () =>{
    const response = await API.contents.getContentsList({
      id: itemId,
    });

    setContentsInfo(response.data.data);

  }, [itemId]);

  const ItemInfoCallback = useCallback(async () =>{
    const response = await API.item.getItem({
      id: itemId,
    });

    const data = response.data.data;

    setItemInfo(data);

    setInputs({
      id: data.id,
      name: data.name,
      status: data.status,
      writerEmail: data.writerEmail,
      startDate: data.startDate,
      endDate: data.endDate,
      subscribe: data.subscribe,
    })

  }, [itemId]);

  const handleItemRemove = async (id) =>{
    
    await API.item.deleteItem({
      id : id,
    })
    
    navigate(-1);
  }

  const handleItemAlarm = async (id, e) =>{

    setItemInfo(null);

    let response;

    if(e.target.value === 'true'){
      response = await API.item.alarmUnsetItem({
        id : id,
      })
    }
    else{
      response = await API.item.alarmSetItem({
        id : id,
      })
    }

    const data = response.data.data;

    setItemInfo(data);

    setInputs({
      id: data.id,
      name: data.name,
      status: data.status,
      writerEmail: data.writerEmail,
      startDate: data.startDate,
      endDate: data.endDate,
      subscribe: data.subscribe,
    })
    
  }

  const checkForm = ()=>{
    const selectState = {
      name: inputs.name === '',
      status: inputs.status === '',
      startDate: !inputs.startDate,
      endDate: !inputs.endDate,
    };
    const selectError = Object.values(selectState).some((el)=> el===true);

    return selectError;
  }

  const handleItemUpdate = async () =>{

    if(checkForm()) {
      return;
    }
    
    const inputValue = {
      id: itemInfo.id,
      name: inputs.name,
      channelId: itemInfo.channelId,
      status: inputs.status,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
    }

    await API.item.updateItem(inputValue)
    
    navigate(-1);
  }

  const handleAdd= (event) => {
    setAddModalOpen(true);
  };

  const handleClose = async () => {
    setAddModalOpen(false);
    await ContentsInfoCallback();
  }

  const handleBack =() =>{
    navigate(-1);
  }

  useEffect(() =>{
    //컨텐츠 정보 요청
    ContentsInfoCallback();

    //아이템 정보 요청
    ItemInfoCallback();
  }, [ContentsInfoCallback, ItemInfoCallback])
  
  return (
    <Root>
      { addModalOpen && <AddModal Body={ContentAdd} open={addModalOpen} handleClose={handleClose}/>}

      <Grid container spacing={2} >
        <IconButton size='large' color="primary" aria-label="back" onClick={handleBack}>
          <ArrowBack></ArrowBack>
        </IconButton>
        {!itemInfo? 
        <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
          <CircularProgress />
        </Grid> :
        <Grid item xs={12} sm={12} md ={12} lg={12} xl={12}>
          <Button 
          variant="outlined" size="large" color="primary" 
          onClick={handleItemUpdate} 
          startIcon={<SyncAlt/>} 
          sx={{
            margin: (theme)=> theme.spacing(1,1,1,0)
          }}  
        >
          업데이트
        </Button>
        <Button 
          variant="outlined" size="large" color="primary" 
          onClick={handleAdd} 
          startIcon={<Add/>} 
          sx={{
            margin: (theme)=> theme.spacing(1)
          }}  
        >
          컨텐츠
        </Button>
        <Button 
          variant="outlined" size="large" color="secondary" 
          onClick={handleItemRemove.bind(handleItemRemove, itemId)} 
          startIcon={<Delete/>} 
          sx={{
            margin: (theme)=> theme.spacing(1)
          }}  
        >
          삭제
        </Button>
        <Button 
          variant="outlined" size="large" color={inputs['subscribe']? 'success' : 'error'} 
          value={inputs['subscribe']}
          onClick={handleItemAlarm.bind(handleItemAlarm, itemId)} 
          startIcon={<AlarmOn/>} 
          sx={{
            margin: (theme)=> theme.spacing(1)
          }}  
        >
          알림 {inputs['subscribe']? "OFF": "ON"}
        </Button>
        <Tooltip title="아이템 업데이트시 알람을 원하시면 설정에서 메신저를 등록해주세요.">
          <IconButton >
            <QuestionMark/>
          </IconButton>
        </Tooltip>
        </Grid>
        }

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" sx={{
          }}>
            아이템 정보
          </Typography>
        </Grid>

        {!itemInfo? <CircularProgress /> : 
        feilds.map((el) => (
          <Grid key={el.id} item xs={12} sm={4} md={3} lg={2} xl={2}>
            <TextField 
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

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" sx={{
            margin: (theme)=>theme.spacing(1,0),
          }}>
            컨텐츠 리스트
          </Typography>
        </Grid>

        {!contentsInfo? 
          <Fragment>
            {listSkeleton(7)}
          </Fragment> :
          contentsInfo.length === 0? 
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography>컨텐츠를 추가해주세요 ..</Typography> 
          </Grid> :
          contentsInfo.map((el)=>(
            <Grid key={el.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
              <StyledAccordion
                id={el.id}
                firstSummary={dayjs(el.createdAt).format("YYYY.MM.DD HH:mm")}
                secondSummary={`,작성자 : ${el.writerEmail}`}
                expanded={expanded}
                handleChange={handleExpanded}
                Body={
                  <TextareaAutosize
                    aria-label="content"
                    placeholder="내용"
                    defaultValue={el.contents}
                    disabled
                    style={{ width: '100%', fontSize: '1.4em'}}
                  />
                }
              />
            </Grid>
          ))}
        
      </Grid>

    </Root>
  )
}
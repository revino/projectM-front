import React, { useState } from 'react';

//
import API from '../../api/setting';
import { Button, TextareaAutosize, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useParams } from 'react-router-dom';


export default function ContentAdd(props) {

  const {itemId} = useParams();
  
  const [content, setContent] = useState('');

  const handleSubmit= async (event) => {

    const data = {
      itemId: itemId,
      contents: content,
    }

    //
    await API.contents.createContents(data);
    
    props.handleClose();
    event.preventDefault();
  }

  const handleChange= (e) =>{
    setContent(e.target.value)
  }
  
  return (
    <React.Fragment>
      <Typography variant="h3" sx={{
        margin: (theme)=>theme.spacing(2,0),
      }}>
        컨텐츠 생성
      </Typography>
      <Grid container spacing={4} >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography
            sx={{
              margin: (theme)=>theme.spacing(2,0),
            }}
          >
            내용
          </Typography>
          <TextareaAutosize
            minRows={20}
            aria-label="content"
            placeholder="내용"
            defaultValue={content}
            onChange={handleChange}
            style={{ width: '100%', fontSize: '1.4em'}}
          />

        </Grid>
        
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleSubmit}
            sx={{
              fontSize: '1.4em',
            }}
            >작성 완료
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
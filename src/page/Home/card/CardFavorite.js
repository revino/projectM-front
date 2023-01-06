import React from 'react';

//Material UI
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardHeader, Divider } from '@mui/material';
import { Bookmark } from '@mui/icons-material';

export default function CardFavorite(props) {

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="즐겨 찾기" />
      <Divider />
      <CardActions>
        <Button variant="contained" startIcon={<Bookmark>worktime</Bookmark>} size="small" color="primary" onClick={(e)=> navigate("/")}>
          메모
        </Button>
        <Button variant="contained" startIcon={<Bookmark>memo</Bookmark>} size="small" color="primary" onClick={(e)=> navigate("/item")}>
          아이템
        </Button>
      </CardActions>
    </Card>
  );

}
import React from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CardFavorite from './card/CardFavorite';

const Root = styled('div')(({theme})=>({
  padding: theme.spacing(2)
}))

export default function Home(props) {

  return (
    <Root>
      <Grid container spacing={4}>
        <Grid item lg={12} sm={12} xl={12} xs={12}> <CardFavorite/> </Grid>
      </Grid>
    </Root>
  );
}
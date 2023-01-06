import React from 'react'

import { styled } from '@mui/system'
import { Button, Grid } from '@mui/material'

const Root = styled('div')(({theme})=>({
  height: '100%'
}))

const RefreshButton = styled(Button)(({theme})=>({
  fontWeight: 'bold',
  fontSize: '1.2em'
}))

export default function Others(props) {

  return (
    <Root>
      <Grid container spacing={2} sx={{
        padding: (theme)=> theme.spacing(4),
        paddingLeft: (theme)=> theme.spacing(0),
        width: '100%'
      }}>
        <Grid item xs={6} sm={6} md ={2} lg={1.2} xl={1.2}>
          <RefreshButton fullWidth size="large" color = "primary" variant="contained" >others</RefreshButton>
        </Grid>
      </Grid>
    </Root>
  )
}
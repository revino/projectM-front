import React from 'react'

import { styled } from '@mui/system'
import ItemTable from './ItemTable'

const Root = styled('div')(({theme})=>({
  height: '100%',
  margin: theme.spacing(2),
}))

export default function Item(props) {

  return (
    <Root>
      <ItemTable/>
    </Root>
  )
}
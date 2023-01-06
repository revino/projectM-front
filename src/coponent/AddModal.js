import React, { useState } from 'react'

import { Modal } from '@mui/material'
import { styled } from '@mui/system';

const Paper = styled('div')(({theme})=>({
  position: 'absolute',
  width: "70%",
  height: "90%",
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  overflow: "auto"
}))

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function AddModal(props){
  const {Body, open, handleClose, ...el} = props;
  const [modalStyle] = useState(getModalStyle());

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper style={modalStyle}>
        <Body handleClose={handleClose} {...el}/>
      </Paper>
    </Modal>
  )
}
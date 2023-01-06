import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'

export default function StyledAccordion(props){

  const {id, expanded, firstSummary, secondSummary, Body, handleChange} = props

  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)} 
      sx={{
        margin: (theme)=> theme.spacing(1,0)
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ width: '25%', flexShrink: 0 }}>{firstSummary}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{secondSummary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Body}
      </AccordionDetails>
    </Accordion>
  )
}
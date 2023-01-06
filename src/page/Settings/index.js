import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { styled } from '@mui/system'
import { Box, Tab, Tabs } from '@mui/material'

import ChannelSetting from './ChannelSetting'
import Others from './Others'

const Root = styled('div')(({theme})=>({
  height: '100%',
  margin: theme.spacing(2),
}))

const tabs = {
  channel: {
    value : 0,
    label : 'channel',
    component : <ChannelSetting/>,
  },
  other: {
    value : 1,
    label : 'other',
    component : <Others/>,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings(props) {

  const [currentTab, setCurrentTab] = useState(tabs.channel.value);

  const handleTabChange = (e, newValue) => { setCurrentTab(newValue); }

  return (
    <Root>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
        >
          {
            Object.values(tabs).map((el)=>
              <Tab label={el.label} key={el.value} {...a11yProps(el.value)}/>        
            )
          }
        </Tabs>
      </Box>
      {
        Object.values(tabs).map((el)=>
          <TabPanel value={currentTab} key={el.value} index={el.value}>
            {el.component}
          </TabPanel>        
        )
      }
  </Root>
  )
}
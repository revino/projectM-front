
import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

//ui
import { styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

//component
import Topbar from '../coponent/Topbar';
import Sidebar from '../coponent/Sidebar';
//import Footer from '../coponent/Footer';

const PREFIX = 'MainLayout';
const classes = {
  root: `${PREFIX}-root`,
  shiftContent: `${PREFIX}-shiftContent`,
}

const Root = styled('div')(({theme})=>({
  [`&.${classes.root}`]: {
    paddingTop: 64,
  },
  [`&.${classes.shiftContent}`]: {
    paddingLeft: 240
  },
}))

const Main = styled('main')({
  height: '100%'
})

export default function MainLayout(props){

  const { children } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenSidebar(!openSidebar);
  };

  useEffect(() =>{
    setOpenSidebar(false);
  }, [children])

  return (
    <Root
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar 
        onOpen={toggleDrawer(true)}
      />
      <Sidebar
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDesktop ? true : openSidebar}
        //variant={isDesktop ? 'persistent' : 'temporary'}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <Main>
        {children}
      </Main>
    </Root>
  );

}
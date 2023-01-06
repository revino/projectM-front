
import React, { useState } from 'react';

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

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Root
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen}/>
      <Sidebar
        onClose={handleSidebarClose}
        onOpen={handleSidebarOpen}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <Main>
        {children}
      </Main>
    </Root>
  );

}
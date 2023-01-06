import React from 'react';

import { Divider, styled, SwipeableDrawer } from '@mui/material';
import { Dashboard, Login, Settings, TableChart } from '@mui/icons-material';

import Profile     from './Profile';
import SidebarNav  from './SidebarNav';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.white,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(2)
}))

export default function Sidebar(props) {
  const { open, variant, onClose, onOpen, className, ...rest } = props;

  const pages = [
    {
      title: '대시보드',
      href: '/',
      icon: <Dashboard />
    },
    {
      title: '아이템',
      href: '/item',
      icon: <TableChart />
    },
    {
      title: '설정',
      href: '/settings',
      icon: <Settings />
    },
    {
      title: '로그아웃',
      href: '/logout',
      icon: <Login />
    }
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={onClose}
      open={open}
      onOpen={onOpen}
      variant={variant}
      PaperProps={{
        sx: (theme) => ({
          width: 240,
          [theme.breakpoints.up('md')]: {
            marginTop: '64px',
            height: 'calc(100% - 64)'
          }
        })
      }}
    >
      <Root {...rest}>
        <Profile/>
        <Divider 
          sx={{
            margin: (theme)=>theme.spacing(2, 0),
          }}
        />
        <SidebarNav
          pages={pages}
          onClose={onClose}
          sx={{
            marginBottom: (theme)=>theme.spacing(2)
          }}
        />
      </Root>
    </SwipeableDrawer>
  );
};
import React from 'react';

import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Logout, Menu } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';

const FlexGrow = styled('div')({
  flexGrow: 1
})

export default function Topbar(props) {
  const { onOpen, minimal , ...rest } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const logoutHidden = useMediaQuery(theme => theme.breakpoints.down('md'));
  const menuHidden = useMediaQuery(theme => theme.breakpoints.up('md'));

  const handleSignOut = () => {
    navigate('/logout')
  };

  return (
    <AppBar
      {...rest}
      color= {minimal && "primary"}
      //position= {minimal && "fixed"}
      sx={{ boxShadow: 0, zIndex: (theme)=> theme.zIndex.drawer }}
    >
      <Toolbar>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Typography
            variant="h4"
            color={theme.palette.primary.contrastText}
          >작업 관리
          </Typography>
        </Link>
        {!minimal &&
          <React.Fragment>
            <FlexGrow/>
            {!logoutHidden && <IconButton
              onClick={handleSignOut}
              color="inherit"
              sx={{
                marginLeft: (theme)=>theme.spacing(1),
                display: {}
              }}
            >
              <Logout />
            </IconButton>
            }
            {!menuHidden && <IconButton
              color="inherit"
              onClick={onOpen}
            >
              <Menu/>
            </IconButton>
            }
          </React.Fragment>
        }
      </Toolbar>
    </AppBar>
  );
};

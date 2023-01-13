import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, colors, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';

const Icon = styled('div')(({theme})=>({
  color: theme.palette.icon,
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1)
}))

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <Link {...props} />
  </div>
));

export default function SidebarNav(props) {
  const { pages, onClose, ...rest } = props;


  return (
    <Box
      //onClick={onClose}
      onKeyDown={onClose}
    >
      <List {...rest}>
        {pages.map(page => (
          <ListItem
            sx={{
              display: 'flex',
              paddingTop: 0,
              paddingBottom: 0
            }}
            disableGutters
            key={page.title}
          >
            <Button
              component={CustomRouterLink}
              to={page.href}
              sx={{
                color: colors.blueGrey[800],
                padding: '10px 8px',
                justifyContent: 'flex-start',
                textTransform: 'none',
                letterSpacing: 0,
                width: '100%',
                fontWeight: (theme)=>theme.typography.fontWeightMedium,
                active: {
                  color: (theme)=>theme.palette.primary.main,
                  fontWeight: (theme)=>theme.typography.fontWeightMedium,
                  '& $icon': {
                    color: (theme)=>theme.palette.primary.main
                  }
                }
              }}
            >
              <Icon>{page.icon}</Icon>
              {page.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
   
  );
};


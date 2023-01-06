import React from 'react';

//ui
import { Avatar, Link, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

//hooks

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 'fit-content'
})

function Profile(props) {

  const { className, ...rest } = props;

  const user = useSelector((state) => state.user.info);
  const isUserInfo = useSelector((state) => state.user.isUserInfo);
  
  return (
    <Root
      {...rest}
    >
      {<Avatar
        alt="Person"
        component={Link}
        src={isUserInfo? user.photo : ''}
        to="/settings"
        sx={{
          width: 120,
          height: 120,
        }}
      />}

      <Typography
        variant="h4"
        sx={{marginTop: (theme)=> theme.spacing(1)}}
        >
        {isUserInfo? user.name : ''}
      </Typography>
    </Root>
  );
};


export default Profile

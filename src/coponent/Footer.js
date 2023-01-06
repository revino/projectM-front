import React from 'react';

import { Link, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
    height: '40px',
    bottom: '0px',
    position: 'absolute'
  }
))
  
const Footer = props => {
  const { ...rest } = props;

  return (
    <Root
      {...rest}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          target="_blank"
        >
          ...
        </Link>
        . 2022
      </Typography>
      <Typography variant="caption">
        A.B.C.D.E.F
      </Typography>
    </Root>
  );
};

export default Footer;
/** @jsx jsx */
import React from 'react';
import { jsx, Box } from 'theme-ui';
import List from './List';

interface Props {
  title: string;
}

const Section: React.FC<Props> = ({ title, children }) =>(
  <Box sx={{
    flex: '1',
    px: 3,
    '& + &': {
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
      borderLeftColor: 'muted',
    }
  }}>
    <h1 sx={{ mt: 0, mb: 3, fontWeight: 'heading'}}>{title}</h1>
    <List>
      {children}
    </List>
  </Box>
);

export default Section;

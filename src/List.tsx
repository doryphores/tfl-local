/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

const List: React.FC = ({ children }) => (
  <ul sx={{
    listStyle: 'none',
    m: 0,
    p: 0,
  }}>
    {children}
  </ul>
);

export default List;

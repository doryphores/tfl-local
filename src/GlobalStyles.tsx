import React from 'react';
import { Global } from '@emotion/core';

const GlobalStyles: React.FC = () => (
  <Global
    styles={(theme) => ({
      body: {
        padding: 0,
        margin: 0,
      },
    })}
  />
);

export default GlobalStyles;

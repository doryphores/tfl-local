import React from 'react';
import { Global } from '@emotion/core';

const GlobalStyles: React.FC = () => (
  <Global
    styles={theme => ({
      html: {
        height: '100%',
      },
      body: {
        minHeight: '100%',
        padding: 0,
        margin: 0,
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
      }
    })}
  />
);

export default GlobalStyles;

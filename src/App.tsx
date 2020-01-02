/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled, ThemeProvider, ColorMode } from 'theme-ui';
import { Flex } from '@theme-ui/components';

import { connect } from './socket';
import theme from './theme';
import DepartureBoard from './DepartureBoard';

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  useEffect(() => connect(setDepartures), []);
  return (
    <ThemeProvider theme={theme}>
      <ColorMode />
      <Styled.root>
        <Flex
          sx={{
            py: 3,
            minHeight: '100vh',
            width: '100vw',
            flexDirection: ['column', 'row'],
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <DepartureBoard
            mode="bus"
            title="Buses"
            departures={departures.bus}
          />
          <DepartureBoard
            mode="train"
            title="Trains"
            departures={departures.train}
          />
        </Flex>
      </Styled.root>
    </ThemeProvider>
  );
};

export default App;

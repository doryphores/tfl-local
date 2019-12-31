/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled, ThemeProvider } from 'theme-ui';
import { Flex } from '@theme-ui/components';

import { connect } from './socket';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import DepartureBoard from './DepartureBoard';

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  useEffect(() => connect(setDepartures), []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styled.root>
        <Flex
          sx={{ py: 3, minHeight: '100vh', flexDirection: ['column', 'row'] }}
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

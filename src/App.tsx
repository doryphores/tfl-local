/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled, ThemeProvider, ColorMode } from 'theme-ui';

import { connect } from './socket';
import theme from './theme';
import Layout from './Layout';
import DepartureBoard from './DepartureBoard';
import Clock from './Clock';

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  useEffect(() => connect(setDepartures), []);
  return (
    <ThemeProvider theme={theme}>
      <ColorMode />
      <Styled.root>
        <Layout>
          <Clock />
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
        </Layout>
      </Styled.root>
    </ThemeProvider>
  );
};

export default App;

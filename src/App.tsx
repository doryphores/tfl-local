/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled, ThemeProvider, ColorMode } from 'theme-ui';

import { connect, Status } from './socket';
import theme from './theme';
import Layout from './Layout';
import DepartureBoard from './DepartureBoard';
import Clock from './Clock';
import ConnectionStatus from './ConnectionStatus';

let currentBuildNumber: string = '';

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  const [connectionStatus, setConnectionStatus] = useState<Status>(
    'connecting',
  );
  useEffect(() => {
    const socket = connect();
    socket.on('status', (status: Status) => setConnectionStatus(status));
    socket.on('message', ({ buildNumber, departureData }) => {
      if (currentBuildNumber && currentBuildNumber !== buildNumber) {
        window.location.reload(true);
        return;
      }
      currentBuildNumber = buildNumber;
      setDepartures(departureData);
    });
  }, []);
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
          <ConnectionStatus status={connectionStatus} />
        </Layout>
      </Styled.root>
    </ThemeProvider>
  );
};

export default App;

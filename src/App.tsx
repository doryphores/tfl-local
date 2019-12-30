/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import { Flex } from '@theme-ui/components';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Item, { Props as ItemProps } from './Item';
import Section from './Section';

interface Departure {
  id: string;
  line: string;
  destination: string;
  time: Date;
};

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onmessage = (event) => {
      setDepartures(JSON.parse(event.data));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styled.root>
        <Flex py={3} sx={{minHeight: '100vh'}}>
          <Section title='Buses'>
          {departures.bus.map(({ line, destination, time, id }: Departure) => (
              <Item key={id}
                variant='bus'
                name={line}
                direction={destination}
                time={new Date(time)} />
            ))}
          </Section>
          <Section title='Trains'>
            {departures.train.map(({ line, destination, time, id }: Departure) => (
              <Item key={id}
                variant={line.toLowerCase() as ItemProps['variant']}
                name={line}
                direction={destination}
                time={new Date(time)} />
            ))}
          </Section>
        </Flex>
      </Styled.root>
    </ThemeProvider>
  )
};

export default App;

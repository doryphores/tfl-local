/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, Styled } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import { Flex } from '@theme-ui/components';

import { connect } from './socket';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Item from './Item';
import Section from './Section';

const App: React.FC = () => {
  const [departures, setDepartures] = useState({ bus: [], train: [] });
  useEffect(() => connect(setDepartures), []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styled.root>
        <Flex py={3} sx={{ minHeight: '100vh' }}>
          <Section title="Buses">
            {departures.bus.map(({ line, destination, time, id }) => (
              <Item key={id} mode="bus" line={line} direction={destination} time={new Date(time)} />
            ))}
          </Section>
          <Section title="Trains">
            {departures.train.map(({ line, destination, time, id }) => (
              <Item key={id} mode="train" line={line} direction={destination} time={new Date(time)} />
            ))}
          </Section>
        </Flex>
      </Styled.root>
    </ThemeProvider>
  );
};

export default App;

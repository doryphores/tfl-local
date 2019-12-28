/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import { Flex } from '@theme-ui/components';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Item from './Item';
import Section from './Section';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Styled.root>
      <Flex py={3} sx={{minHeight: '100vh'}}>
        <Section title='Buses'>
          <Item variant='bus'
                name='197'
                direction='Crystal Palace'
                time='4 minutes' />
        </Section>
        <Section title='Trains'>
          <Item variant='thameslink'
                name='Thameslink'
                direction='Bedford'
                time='4 minutes' />
          <Item variant='overground'
                name='Overground'
                direction='Highbury & Islington'
                time='4 minutes' />
          <Item variant='southern'
                name='Southern'
                direction='London Bridge'
                time='10 minutes' />
        </Section>
      </Flex>
    </Styled.root>
  </ThemeProvider>
);

export default App;

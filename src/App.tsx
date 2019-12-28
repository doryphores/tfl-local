/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import { Flex, Box } from '@theme-ui/components';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import List from './List';
import Item from './Item';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Styled.root>
      <Flex py={3} sx={{minHeight: '100vh'}}>
        <Box px={3} sx={{flex: '1'}}>
          <Styled.h1>Buses</Styled.h1>

          <List>
            <Item variant='bus'
                  name='197'
                  direction='Crystal Palace'
                  time='4 minutes' />
          </List>
        </Box>
        <Box px={3} sx={{flex: '1'}}>
          <Styled.h1>Trains</Styled.h1>

          <List>
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
          </List>
        </Box>
      </Flex>
    </Styled.root>
  </ThemeProvider>
);

export default App;

/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Flex } from '@theme-ui/components';

const Layout: React.FC = ({ children }) => (
  <Flex
    sx={{
      width: '100vw',
      height: ['auto', '100vh', 'auto'],
      minHeight: '100vh',
      flexDirection: ['column', 'row'],
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: ['auto', 'hidden', 'auto'],
      pt: 3,
      pb: [3, 0],
    }}
  >
    {children}
  </Flex>
);

export default Layout;

/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Flex } from '@theme-ui/components';

const Layout: React.FC = ({ children }) => (
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
    {children}
  </Flex>
);

export default Layout;

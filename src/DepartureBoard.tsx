/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

import DepartureItem from './DepartureItem';
import { Departure } from './socket';

interface Props {
  mode: 'bus' | 'train';
  title: string;
  departures: Departure[];
}

const DepartureBoard: React.FC<Props> = ({ mode, title, departures }) => (
  <Box
    sx={{
      flex: ['0', '1'],
      px: 3,
      pb: [0, 3],
      '& + &': {
        borderStyle: 'solid',
        borderWidth: 0,
        borderLeftWidth: [0, '1px'],
        borderTopWidth: ['1px', 0],
        borderColor: 'muted',
        mt: [4, 0],
        pt: [3, 0],
      },
      '& + & h1': {
        textAlign: ['left', 'right'],
      },
    }}
  >
    <h1 sx={{ mt: 0, mb: 3, fontWeight: 'heading' }}>{title}</h1>
    <ul
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {departures.map(({ line, destination, time, id }) => (
        <DepartureItem
          key={id}
          mode={mode}
          line={line}
          direction={destination}
          time={new Date(time)}
        />
      ))}
    </ul>
  </Box>
);

export default DepartureBoard;

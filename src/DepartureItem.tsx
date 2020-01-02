/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Badge } from '@theme-ui/components';
import { formatDistance, format } from 'date-fns';
import { useEffect, useState } from 'react';

export interface Props {
  mode: 'bus' | 'train';
  line: string;
  direction: string;
  time: Date;
}

const DepartureItem: React.FC<Props> = ({ mode, line, direction, time }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    let timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <li
      sx={{
        display: 'flex',
        // alignItems: 'center',
        '& + &': {
          pt: [1, 2, 3],
          mt: [1, 2, 3],
          borderTopColor: 'muted',
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
        },
      }}
    >
      <Badge
        sx={{ whiteSpace: 'nowrap' }}
        variant={mode === 'bus' ? 'bus' : line.toLowerCase()}
      >
        {line}
      </Badge>
      <span
        sx={{
          flex: '1',
          px: 2,
          py: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {direction}
      </span>
      <span
        title={format(time, 'HH:mm')}
        sx={{ whiteSpace: 'nowrap', fontWeight: 'time', py: 1 }}
      >
        {formatDistance(time, now, { addSuffix: true })}
      </span>
    </li>
  );
};

export default DepartureItem;

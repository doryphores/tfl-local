/** @jsx jsx */
import React from 'react';
import { jsx, SxProps } from 'theme-ui';
import { Badge } from '@theme-ui/components';
import { formatDistance, format } from 'date-fns';

export interface Props {
  mode: 'bus' | 'train';
  line: string;
  direction: string;
  time: Date;
}

const textOverflow: SxProps['sx'] = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const Item: React.FC<Props> = ({ mode, line, direction, time }) => (
  <li
    sx={{
      display: 'flex',
      '& + &': {
        pt: 2,
        mt: 2,
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
        ...textOverflow,
        flex: '1',
        py: 1,
        px: 2,
      }}
    >
      {direction}
    </span>
    <span
      title={format(time, 'HH:mm')}
      sx={{ py: 1, whiteSpace: 'nowrap', fontWeight: 'time' }}
    >
      {formatDistance(time, new Date())}
    </span>
  </li>
);

export default Item;

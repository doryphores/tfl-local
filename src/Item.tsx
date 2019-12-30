/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Badge } from '@theme-ui/components';
import { formatDistance } from 'date-fns';

export interface Props {
  variant: 'bus' | 'southern' | 'overground' | 'thameslink';
  name: string;
  direction: string;
  time: Date;
};

const Item: React.FC<Props> = ({ variant, name, direction, time }) => (
  <li sx={{
    display: 'flex',
    '& + &': {
      pt: 2,
      mt: 2,
      borderTopColor: 'muted',
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
    }
  }}>
    <Badge
      variant={variant}
      sx={{
        fontSize: 2,
        fontWeight: 'badge',
        px: 2,
        py: 1,
        borderRadius: '3px',
      }}>
      {name}
    </Badge>
    <span
      sx={{
        flex: 'auto',
        py: 1,
        px: 2,
      }}>
      {direction}
    </span>
    <span sx={{py: 1}}>{formatDistance(time, new Date())}</span>
  </li>
);

export default Item;

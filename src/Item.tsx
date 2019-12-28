/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Badge } from '@theme-ui/components';

interface Props {
  variant: 'bus' | 'southern' | 'overground' | 'thameslink';
  name: string;
  direction: string;
  time: string;
};

const Item: React.FC<Props> = ({ variant, name, direction, time }) => (
  <li sx={{display: 'flex'}}>
    <Badge
      variant={variant}
      sx={{
        fontSize: 2,
        px: 2,
        py: 1,
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
    <span sx={{py: 1}}>{time}</span>
  </li>
);

export default Item;

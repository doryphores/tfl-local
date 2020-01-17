/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box } from 'theme-ui';
import { keyframes } from '@emotion/core';
import { useEffect, useState, useCallback } from 'react';
import { Status } from './socket';

const STATUS_DISPLAY = {
  connected: 'Connected!',
  connecting: 'Connecting...',
  disconnected: 'Disconnected!',
};

const fadeIn = keyframes`
  from {
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateX(-50%) translateY(0);
  }
  to {
    transform: translateX(-50%) translateY(-100%);
  }
`;

interface Props {
  status: Status;
}

const ConnectionStatus: React.FC<Props> = ({ status }: Props) => {
  const [render, setRender] = useState(status !== 'connected');
  useEffect(() => {
    if (status !== 'connected') setRender(true);
  }, [status]);

  const onAnimationEnd = useCallback(() => {
    if (status === 'connected') setRender(false);
  }, [status]);

  if (!render) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: '50%',
        py: 2,
        px: 3,
        fontSize: 4,
        bg: 'muted',
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        animation: `${status !== 'connected' ? fadeIn : fadeOut} 400ms
          ease-out forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {STATUS_DISPLAY[status]}
    </Box>
  );
};

export default ConnectionStatus;

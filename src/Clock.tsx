/** @jsx jsx */
import { jsx } from 'theme-ui';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    let timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      sx={{
        display: ['none', 'block'],
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100vw',
        textAlign: 'center',
        fontSize: 3,
        fontWeight: 'bold',
      }}
    >
      <span
        sx={{
          display: 'inline-block',
          bg: 'background',
          py: 2,
          px: 3,
          borderWidth: 1,
          borderColor: 'muted',
          borderStyle: 'solid',
          borderTop: 'none',
          borderRadius: '0 0 2px 2px',
        }}
      >
        {format(now, 'HH:mm:ss')}
      </span>
    </div>
  );
};

export default Clock;

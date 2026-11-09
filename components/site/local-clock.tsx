'use client';

import { useSyncExternalStore } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

function subscribe(tick: () => void) {
  const timer = window.setInterval(tick, 1000);
  document.addEventListener('visibilitychange', tick);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', tick);
  };
}

const getTime = () => formatter.format(new Date());
const getServerTime = () => null;

export function LocalClock() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);

  return (
    <time
      dateTime={time ?? undefined}
      title="Local time"
      aria-hidden={time === null ? true : undefined}
      className="inline-block min-w-[8ch] whitespace-nowrap font-mono text-xs tabular-nums text-brand"
    >
      {time ?? '--:--:--'}
    </time>
  );
}

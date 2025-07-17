// components/ui/Clock.tsx
'use client'
import { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const newTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      setTime(prev => prev === newTime ? prev : newTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>
}
'use client';
// React
import React, { useEffect, useRef, useState } from 'react';

// Libraries
import {
  differenceInMilliseconds,
  differenceInHours,
  intervalToDuration,
  isAfter,
  format,
} from 'date-fns';

// Utils
import { DATETIME_FORMAT } from '@/utils/constants/date';
import { DATE } from '@/utils/constants/langs';

type CountdownProps = {
  targetDate: Date;
  prefix?: string;
  suffix?: string;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  className?: string;
  showProcessbar?: boolean;
  showAsDateIfMoreThan24Hours?: boolean;
  formatDate?: string;
  onCountdownComplete?: () => void;
};

type TimeLeftType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const maxTimestamp = 23 * 60 * 60 * 1000;
const timeInterval = 1000;

export default function Countdown({
  targetDate,
  prefix = '',
  suffix = '',
  showDays,
  showHours = true,
  showMinutes = true,
  showSeconds,
  className = '',
  showProcessbar = false,
  showAsDateIfMoreThan24Hours = false,
  formatDate = DATETIME_FORMAT.UNTIL_DATE,
  onCountdownComplete,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeftType | null>(null);
  const [isMoreThan24Hours, setIsMoreThan24Hours] = useState(false);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const processBarRef = useRef<HTMLDivElement | null>(null);

  const calculateTimeLeft = () => {
    const now = new Date();
    const distance = differenceInMilliseconds(targetDate, now);
    const isTimeUp = isAfter(now, targetDate);

    if (showProcessbar && processBarRef?.current && boxRef?.current) {
      if (isTimeUp || distance <= 0) {
        processBarRef.current.style.width = '100%';
      } else {
        const elapsedPercentage = (distance / maxTimestamp) * 100;
        processBarRef.current.style.width = `calc(100% - ${elapsedPercentage}%)`;
      }
    }

    if (isTimeUp || distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const duration = intervalToDuration({ start: now, end: targetDate });
    return {
      days: duration.days || 0,
      hours: duration.hours || 0,
      minutes: duration.minutes || 0,
      seconds: duration.seconds || 0,
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      setIsMoreThan24Hours(differenceInHours(targetDate, new Date()) > 24);

      if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
      ) {
        onCountdownComplete && onCountdownComplete();
        clearInterval(timer);
      }
    }, timeInterval);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div />;
  }

  if (showAsDateIfMoreThan24Hours && isMoreThan24Hours) {
    return (
      <p className={`text-gray-60 text-[11px] ${className}`}>
        {prefix}
        {format(targetDate, formatDate)}
        {suffix}
      </p>
    );
  }

  return (
    <div className={`${className} relative`} ref={boxRef}>
      {showProcessbar && (
        <div className="absolute bg-mint-green left-0 top-0 h-full" ref={processBarRef} />
      )}
      <div
        className={`flex justify-center items-center w-full h-full ${
          showProcessbar ? 'absolute left-0 top-0' : ''
        }`}
      >
        {prefix}
        {showDays && timeLeft.days} {showHours && `${timeLeft.hours}${DATE.time}`}
        {showMinutes && `${timeLeft.minutes}${DATE.minutes}`} {showSeconds && timeLeft.seconds}
        {suffix}
      </div>
    </div>
  );
}

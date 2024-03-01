import React from "react";
import { useTimer } from "react-timer-hook";

export const MyTimer = ({
  expiryTimestamp,
  submitHandle,
}: {
  expiryTimestamp: any;
  submitHandle?: any;
}) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => submitHandle(),
  });

  return (
    <span>
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> Hrs.
    </span>
  );
};

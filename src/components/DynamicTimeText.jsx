import React, { useEffect, useState } from "react";

const OneMinuteInMillis = 60000;

const DynamicTimeText = (props) => {
  const [displayTime, setDisplayTime] = useState(null);

  const updateTime = () => {
    let now = new Date();
    let newDisplayTime = now.toLocaleString("en-NZ", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setDisplayTime(newDisplayTime);
  };

  useEffect(() => {
    updateTime();

    const onTimerTick = setInterval(() => {
      updateTime();
    }, OneMinuteInMillis);

    return () => {
      clearTimeout(onTimerTick);
    };
  }, []);

  return <span>{displayTime}</span>;
};

export default DynamicTimeText;

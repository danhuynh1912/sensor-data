import React, { useState, useRef, useEffect } from "react";

// style
import "./style/index.local.css";

// utils
// @ts-ignore
import secondsToMinutes from "../../utils/secondsToMinutes.ts";

interface Props {
  seconds: number;
}

const Timer = (props: Props) => {
  const { seconds } = props;
  const timeLocalStorage = Number(window.localStorage.getItem("time"));
  const _time = timeLocalStorage || seconds;
  const [min, setMin] = useState(secondsToMinutes(timeLocalStorage).m);
  const [sec, setSec] = useState(secondsToMinutes(timeLocalStorage).s);

  useEffect(() => {
    setMin(secondsToMinutes(_time).m);
    setSec(secondsToMinutes(_time).s);
    startTimer();
    return () => window.clearInterval(timer);
  }, [_time]);

  useEffect(() => {
    if (sec === -1) {
      if (_time < 60) setSec(_time);
      else {
        setMin((prevMin: any) => prevMin - 1);
        setSec(59);
      }
    }
    if (min === -1) {
      setMin(
        sec === 59 ? secondsToMinutes(_time).m - 1 : secondsToMinutes(_time).m
      );
    }
  }, [sec, min]);

  let timer: any = useRef(0);

  const startTimer = () => {
    if (timer.current == 0 && _time > 0) {
      timer = window.setInterval(countDown, 1000);
    }
  };
  const countDown = () => {
    setSec((prevSec: any) => prevSec - 1);
  };

  return (
    <div>
      <span className="time">{min}</span> m :{" "}
      <span className="time">{sec > 9 ? sec : `0${sec}`}</span> s
    </div>
  );
};

export default Timer;

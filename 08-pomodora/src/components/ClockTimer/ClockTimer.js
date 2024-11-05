import React, { useEffect, useRef } from "react";
import AudioControl from "../AudioControl/AudioControl.js";
import { HvrBounceToTopButton } from "../Button.js";
import { useState } from "react";
import { useClockType, useClockTypeDispatch } from "../ClockContext.js";
import "./ClockTimer.css";
import "hover.css";

export default function ClockTimer({ clockStatus, setClockStatus }) {
  const clockType = useClockType();
  const dispatch = useClockTypeDispatch();

  const clock = clockType.filter((item) => item.active)[0];

  const initialLength = clock.time * 60 * 1000;
  const [type, setType] = useState(clock.name);
  const [remainingTime, setRemainingTime] = useState(initialLength);
  const [efficialTime, setEfficialTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [clockRule, setClockRule] = useState(clock.rule);
  const timerRef = useRef(null);

  // Use useEffect to listen for clockType changes and reset remainingTime when clockType changes
  useEffect(() => {
    if (clockStatus === "close") {
      setRemainingTime(clock.time * 60 * 1000);
      setEfficialTime(0);
      setType(clock.name);
      setClockRule(clock.rule);
    }
    if (remainingTime === 0) {
      setClockStatus("close");
      setShowPopup(true);
      clearInterval(timerRef.current);
    }
  }, [clock, remainingTime, clockStatus]);

  // Use useEffect to listen for showPopup changes and change overlay opacity
  useEffect(() => {
    showPopup
      ? document.documentElement.style.setProperty("--overlay-opacity", "0.6")
      : document.documentElement.style.setProperty("--overlay-opacity", "0.3");
  }, [showPopup]);

  // handle start, pause, reset button
  const handleStartBtn = () => {
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
      setEfficialTime((prev) => prev + 1000);
    }, 1000);
    setClockStatus("running");
  };

  const handlePauseBtn = () => {
    clearInterval(timerRef.current);
    setClockStatus("Pause");
  };

  const handleResetBtn = () => {
    setRemainingTime(clock.time * 60 * 1000);
    setEfficialTime(0);
    setClockStatus("close");
    clearInterval(timerRef.current);
  };

  return (
    <>
      <AudioControl clockStatus={clockStatus} />
      {/* clock */}
      <div className="clock" id={clock.id}>
        <p className="clock-title">{type}</p>
        <div className="clock-timer">
          <div className="clock-timer-text">
            {clockRule === "Countdown" &&
              (Math.floor(remainingTime / 1000 / 60) >= 10
                ? Math.floor(remainingTime / 1000 / 60)
                : "0" + Math.floor(remainingTime / 1000 / 60)) +
                ":" +
                (Math.floor((remainingTime / 1000) % 60) >= 10
                  ? Math.floor((remainingTime / 1000) % 60)
                  : "0" + Math.floor((remainingTime / 1000) % 60))}

            {clockRule === "Countup" &&
              (Math.floor(efficialTime / 1000 / 60) >= 10
                ? Math.floor(efficialTime / 1000 / 60)
                : "0" + Math.floor(efficialTime / 1000 / 60)) +
                ":" +
                (Math.floor((efficialTime / 1000) % 60) >= 10
                  ? Math.floor((efficialTime / 1000) % 60)
                  : "0" + Math.floor((efficialTime / 1000) % 60))}
          </div>
          <div className="control-btn">
            <HvrBounceToTopButton
              className={clockStatus === "pause" ? "pauseBtn" : "runningBtn"}
              onClick={() => {
                clockStatus === "running" ? handlePauseBtn() : handleStartBtn();
              }}
            >
              {clockStatus === "running" ? "Pause" : "Start"}
            </HvrBounceToTopButton>
            <button
              className="resetBtn hvr-bounce-to-top"
              onClick={() => handleResetBtn()}
            >
              <svg
                t="1724404247182"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3839"
              >
                <path
                  d="M808 602.9c-23.6 164.2-181.8 285.5-358.7 248.3C336.9 827.6 245.6 736.8 222 624.4c-40.3-192 92-361.8 290.4-361.8v99.2l248-148.8-248-148.8v99.2c-248 0-438 222.4-388.6 476.5 30.1 154.7 155 279.4 309.7 309.5C668 995 875.6 833.9 906.2 616.1c4.2-29.6-19.7-55.8-49.5-55.8h0.1c-24.7 0-45.3 18.2-48.8 42.6z"
                  p-id="3840"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* popup */}
      {showPopup && (
        <div className="popup">
          <p>Timer up! Pomodoro completed!</p>
          <div className="popup-btn">
            <button
              className={
                (type !== "Break" ? "quarter" : "full-line") +
                " hvr-bounce-to-right"
              }
              onClick={() => {
                setShowPopup(false);
              }}
            >
              {type !== "Break" ? "Cancel" : "Close"}
            </button>
            {type !== "Break" && (
              <button
                className="three-quarters hvr-bounce-to-right"
                onClick={() => {
                  dispatch({ type: "toggle ClockType", id: 1 });
                  setShowPopup(false);
                }}
              >
                Break 5 minutes
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

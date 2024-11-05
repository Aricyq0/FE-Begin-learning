import { useEffect, useState } from "react";
import { useClockType, useClockTypeDispatch } from "../ClockContext";
import ClockTypeItem from "./ClockTypeItem";
import "hover.css";
import "./ClockType.css";
import { HvrGrowButton } from "../Button";

let nextId = 3; // Initialize next ID for new clock types

export default function ClockType({ clockStatus }) {
  // Exporting the ClockType component
  const ClockTypes = useClockType();
  const dispatch = useClockTypeDispatch();
  const [addStatus, setAddStatus] = useState(false);
  const [typeContainerShow, setTypeContainerShow] = useState(true);

  useEffect(() => {
    if (clockStatus !== "running") {
      setTypeContainerShow(true);
    } else {
      setTypeContainerShow(false);
    }
  }, [clockStatus]);

  const CancelForm = () => (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4615 5L5.46152 15"
        stroke="black"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.46152 5L15.4615 15"
        stroke="black"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <>
      <div
        className={
          "clock-type-container" + (typeContainerShow ? " show" : " hide")
        }
      >
        <div className="clock-type-header">
          <h3>Type</h3>
        </div>
        <div className="present-clock-type">
          {ClockTypes.map((item) => (
            <ClockTypeItem key={item.id} item={item} />
          ))}
        </div>

        {!addStatus && (
          <HvrGrowButton
            className={
              "add-clock-type hvr-grow" + (addStatus ? " fade-out" : " fade-in")
            }
            onClick={() => {
              setAddStatus(true);
            }}
          >
            Add
          </HvrGrowButton>
        )}

        <div
          className={
            "add-clock-type-form" +
            (addStatus ? " slide-in-down" : " slide-out-down")
          }
        >
          <h3>Add new type</h3>
          <HvrGrowButton
            className="cancel-form"
            onClick={() => setAddStatus(false)}
          >
            <CancelForm />
          </HvrGrowButton>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAddStatus(false);
              dispatch({
                type: "Add new type",
                id: nextId++,
                name: e.target.elements[0].value,
                time:
                  parseInt(e.target.elements[1].value, 10) >= 0
                    ? parseInt(e.target.elements[1].value, 10)
                    : "",
                rule: e.target.elements["clock-timer-type"].value,
              });
            }}
          >
            <div className="form-name">
              <label htmlFor="new-clock-type">Name</label>
              <input type="text" id="new-clock-type" name="new-clock-type" />
            </div>
            <div className="form-time">
              <label htmlFor="new-clock-time">Time</label>
              <input
                type="number"
                id="new-clock-time"
                name="new-clock-time"
              />{" "}
            </div>

            <div className="form-timer-type">
              <p>Timer</p>
              <div>
                <div>
                  <input
                    id="countdown-radio"
                    type="radio"
                    value="Countdown"
                    name="clock-timer-type"
                    checked
                  />
                  <label for="countdown-radio"> Countdown</label>
                </div>
                <div>
                  <input
                    id="countup-radio"
                    type="radio"
                    value="Countup"
                    name="clock-timer-type"
                  />
                  <label for="countup-radio"> Countup</label>
                </div>
              </div>
            </div>

            <button type="submit" className="button hvr-glow">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { DeleteSvg, MinusSvg, PlusSvg } from "./SVG";
import { useClockTypeDispatch } from "../ClockContext";
import "hover.css";
import { HvrGrowShadowButton, HvrPlusGrowButton } from "../Button";

const ClockTypeItem = ({ item }) => {
  const [conflictId, setConflictId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useClockTypeDispatch();
  const handleTypeClick = (e, id) => {
    e.preventDefault();
    dispatch({ type: "toggle ClockType", id: id });
  };
  const handleDeleteTypeClick = (e, item) => {
    if (item.active) {
      e.stopPropagation();
      console.log("delete conflict");
      setShowModal((prev) => !prev);
      setConflictId(item.id);

      return;
    }
    e.stopPropagation();
    dispatch({ type: "Delete ClockType", id: item.id });
  };
  const handleMinusClick = (e, id) => {
    e.stopPropagation();
    dispatch({ type: "minus ClockType time", id: id });
  };
  const handlePlusClick = (e, id) => {
    e.stopPropagation();
    dispatch({ type: "plus ClockType time", id: id });
  };
  return (
    <>
      <div
        key={item.id}
        className={"clock-type hvr-float" + (item.active ? " active" : "")}
        onClick={(e) => handleTypeClick(e, item.id)}
      >
        <div className="type-name">
          <p>{item.name}</p>
          {item.id !== 0 && item.id !== 1 && (
            <HvrPlusGrowButton
              className="delete-clock-type"
              onClick={(e) => handleDeleteTypeClick(e, item)}
            >
              <DeleteSvg />
            </HvrPlusGrowButton>
          )}
        </div>
        <div className="type-setting">
          <HvrGrowShadowButton
            className="time-control button "
            onClick={(e) => handleMinusClick(e, item.id)}
          >
            <MinusSvg />
          </HvrGrowShadowButton>
          <span>{item.time}</span>
          <HvrGrowShadowButton
            className="time-control button "
            onClick={(e) => handlePlusClick(e, item.id)}
          >
            <PlusSvg />
          </HvrGrowShadowButton>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>This clock type is in use. Sure you want to delete?</p>
              <div className="modal-buttons">
                <button
                  className="button hvr-bounce-to-top"
                  onClick={() => {
                    setShowModal(false);
                    setConflictId(null);
                  }}
                >
                  No
                </button>
                <button
                  className="button hvr-bounce-to-top"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "toggle ClockType", id: 0 });
                    dispatch({ type: "Delete ClockType", id: conflictId });
                    setConflictId(null);
                    setShowModal(false);
                    document.querySelector(".resetBtn").click();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ClockTypeItem;

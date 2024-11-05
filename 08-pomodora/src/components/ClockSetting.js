import { ClockTypeProvider } from "./ClockContext.js";
import ClockType from "./ClockType/ClockType.js";
import ClockTimer from "./ClockTimer/ClockTimer.js";
import { useState } from "react";

function ClockSetting() {
  const [clockStatus, setClockStatus] = useState("close");
  return (
    <ClockTypeProvider>
      <ClockTimer clockStatus={clockStatus} setClockStatus={setClockStatus} />
      <ClockType clockStatus={clockStatus} />
    </ClockTypeProvider>
  );
}

export default ClockSetting;

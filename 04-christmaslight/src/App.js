import "bootstrap";
import "./App.css";
import { useState } from "react";

function Group() {
  return (
    <div className="group">
      <div className="circle orange"></div>
      <div className="circle yellow"></div>
      <div className="circle blue"></div>
      <div className="circle green"></div>
    </div>
  );
}

function App() {
  const [light, setLight] = useState(true);
  function handleClick() {
    setLight(!light);
    if (light) {
      document.querySelectorAll(".circle").forEach((circle) => {
        circle.style.animation = "none";
        circle.style.background = "#563260";
      });
    } else {
      document.querySelectorAll(".circle").forEach((circle) => {
        circle.removeAttribute("style");
        circle.style.animationPlayState = "running";
        circle.style.WebkitAnimationPlayState = "running";
      });
    }
  }
  return (
    <div className="App">
      <div className="lights">
        <Group />
        <Group />
      </div>
      <i className={light ? "on" : "off"} id="lightBtn" onClick={handleClick}>
        {light ? "ON" : "OFF"}
      </i>
      <h1>Chiristmas Lights</h1>
    </div>
  );
}

export default App;

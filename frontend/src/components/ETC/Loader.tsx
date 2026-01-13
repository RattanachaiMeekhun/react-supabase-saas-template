import React from "react";
import "./Loader.css";

const colors = ["dot-amber", "dot-blue", "dot-green", "dot-pink", "dot-purple"];

const delays = ["delay-0", "delay-1", "delay-2", "delay-3", "delay-4"];

const Loader: React.FC = () => (
  <div className="loader-container">
    {colors.map((color, i) => (
      <div
        key={i}
        className={`loader-dot ${color} animate-bounce-custom ${delays[i]}`}
      ></div>
    ))}
  </div>
);

export default Loader;

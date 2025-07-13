import React from "react";

const colors = [
  "bg-amber-300",
  "bg-blue-400",
  "bg-green-400",
  "bg-pink-400",
  "bg-purple-400",
];

const delaysPulses = [
  "animate-[pulse_1.2s_ease-in-out_0s_infinite]",
  "animate-[pulse_1.2s_ease-in-out_0.2s_infinite]",
  "animate-[pulse_1.2s_ease-in-out_0.4s_infinite]",
  "animate-[pulse_1.2s_ease-in-out_0.6s_infinite]",
  "animate-[pulse_1.2s_ease-in-out_0.8s_infinite]",
];

const delayBounce = [
  "animate-[bounce_1s_ease-in-out_0s_infinite]",
  "animate-[bounce_1s_ease-in-out_0.2s_infinite]",
  "animate-[bounce_1s_ease-in-out_0.4s_infinite]",
  "animate-[bounce_1s_ease-in-out_0.6s_infinite]",
  "animate-[bounce_1s_ease-in-out_0.8s_infinite]",
];

const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-screen w-screen gap-4">
    {colors.map((color, i) => (
      <div key={i} className={delayBounce[i]}>
        <div
          key={i}
          className={`rounded-full h-16 w-16 ${color} ${delaysPulses[i]}`}
        />
      </div>
    ))}
  </div>
);

export default Loader;

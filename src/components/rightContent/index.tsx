import React from "react";
// @ts-ignore
import Position from "./position/Position.tsx";

// style
import "./style/index.local.css";

interface Props {
  sensors: any[];
}

const RightContent = (props: Props) => {
  const { sensors } = props;

  return (
    <div className="right-content-container">
      {sensors.map((item) => (
        <Position key={item.sensor} item={item} />
      ))}
    </div>
  );
};

export default RightContent;

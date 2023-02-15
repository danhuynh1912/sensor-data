import React from "react";

// style
import "../style/index.local.css";

interface Props {
  value: number;
  unit: string;
  name: string;
}

const SingleValue = (props: Props) => {
  const { value, unit, name } = props;

  return (
    <div className="single-value">
      <p>{name}</p>
      <div className="single-value-div">
        <p>
          <span className="single-value-number">{value}</span>
          <span>{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default SingleValue;

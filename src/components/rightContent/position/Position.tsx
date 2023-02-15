import React from "react";

// components
// @ts-ignore
import LineChart from "../widgets/LineChart.tsx"; // @ts-ignore
import SingleValue from "../widgets/SingleValue.tsx"; // @ts-ignore
import DragDropResize from "../dragDropResize/DragDropResize.tsx";

// style
import "../style/index.local.css";

// constants
// @ts-ignore
import { LINE_CHART } from "../../../constants.ts";

interface Props {
  item: any;
}

const Position = (props: Props) => {
  const { item } = props;
  return (
    <div className="position" style={{ padding: "16px" }}>
      <DragDropResize>
        {item.type === LINE_CHART ? (
          <LineChart name={item.sensor} data={item.data} />
        ) : (
          <SingleValue value={item.value} unit={item.unit} name={item.sensor} />
        )}
      </DragDropResize>
    </div>
  );
};

export default Position;

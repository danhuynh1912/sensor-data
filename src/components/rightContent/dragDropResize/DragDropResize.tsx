import React from "react";
import Draggable from "react-draggable";
import Resizable from "react-resizable-box";

interface Props {
  children: any;
}

export default function LineChart(props: Props) {
  const { children } = props;

  const onResizeStart = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Draggable>
      <div className="widget-border">
        <Resizable
          // @ts-ignore
          onResizeStart={onResizeStart}
          width={"100%"}
          height={"fit-content"}
          lockAspectRatio
        >
          {children}
        </Resizable>
      </div>
    </Draggable>
  );
}

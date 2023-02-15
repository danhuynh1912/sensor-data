import { useState } from "react";
import "./App.css";
import RightContent from "./components/rightContent/index.tsx";
import LeftContent from "./components/leftContent/index.tsx";
import fakeData from "./fakeData.ts";
import { SINGLE_VALUE, LINE_CHART } from "./constants.ts";

function App() {
  const [seconds, setSeconds] = useState(120);
  const [data, setData] = useState(fakeData);
  const [sensors, setSensors] = useState([
    {
      type: LINE_CHART,
      data: [10, 20, 40, 30, 15],
      sensor: "Temperature",
      value: 17,
      unit: "°C",
    },
  ]);
  console.log(data);
  const addWidget = (type, sensor, value, data, unit) => {
    const newWidget = { type, sensor, value, data, unit };
    setSensors([...sensors, newWidget]);
  };
  return (
    <div className="app">
      <LeftContent
        setSensors={setSensors}
        sensors={sensors}
        data={data}
        addWidget={addWidget}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <RightContent sensors={sensors} />
    </div>
  );
}

export default App;

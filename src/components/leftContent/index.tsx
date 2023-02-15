import React, { useState } from "react";

// component
// @ts-ignore
import Timer from "../timer/index.tsx";

// material
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// style
import "./style/index.local.css";

// constants
// @ts-ignore
import { SINGLE_VALUE, LINE_CHART } from "../../constants.ts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

interface Props {
  data: any[];
  sensors: any[];
  addWidget: (
    type: string,
    sensor: string,
    value: number,
    data: number[],
    unit: string
  ) => void;
}

const LeftContent = (props: Props) => {
  const { data, sensors, addWidget } = props;

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(SINGLE_VALUE);
  const [name, setName] = useState("");
  const [sensor, setSensor] = useState("");
  const [timeInterval, setTimeInterval] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const textFieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const radioTypeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const radioSensorOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSensor(event.target.value);
  };
  const clearState = () => {
    handleClose();
    setType(SINGLE_VALUE);
    setName("");
    setSensor("");
  };
  const onClickAddWidget = () => {
    const _sensor = data.find((item) => item.sensor === sensor);
    addWidget(
      type,
      sensor,
      _sensor.value,
      _sensor.historicalData,
      _sensor.unit
    );
    clearState();
  };
  return (
    <div className="left-content-container">
      <h4>Widgets</h4>
      <button className="newWidget" onClick={handleOpen}>
        Add new widget
      </button>
      <h4>Time interval</h4>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose time interval
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeInterval}
          label="Choose time"
          onChange={(event: SelectChangeEvent) => {
            localStorage.setItem("time", event.target.value);
            setTimeInterval(event.target.value);
          }}
        >
          <MenuItem value={10}>10 seconds</MenuItem>
          <MenuItem value={30}>30 seconds</MenuItem>
          <MenuItem value={60}>1 minutes</MenuItem>
          <MenuItem value={300}>5 minutes</MenuItem>
        </Select>
      </FormControl>
      <Timer seconds={timeInterval} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 1 }}>
              Widget name
            </FormLabel>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={textFieldOnChange}
              sx={{ width: "100%", mb: 1 }}
            />
            <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 1 }}>
              Widget type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={SINGLE_VALUE}
              name="radio-buttons-group"
              value={type}
              onChange={radioTypeOnChange}
              sx={{ mb: 1 }}
            >
              <FormControlLabel
                value={SINGLE_VALUE}
                control={<Radio />}
                label="Single value"
              />
              <FormControlLabel
                value={LINE_CHART}
                control={<Radio />}
                label="Line chart"
              />
            </RadioGroup>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 1 }}>
              Select sensor
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={sensor}
              onChange={radioSensorOnChange}
              sx={{ mb: 1 }}
            >
              {data.map((item) => (
                <FormControlLabel
                  key={item.sensorId}
                  disabled={sensors.some(
                    (_item) => _item.sensor === item.sensor
                  )}
                  value={item.sensor}
                  control={<Radio />}
                  label={item.sensor}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <button
            className="newWidget"
            onClick={sensor ? onClickAddWidget : undefined}
          >
            Add new widget
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default LeftContent;

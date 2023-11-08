import React from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useReactFlowContext } from "../../../context/reactFlowContext";
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const DelayOptions = () => {
  const { state, handleDelayUpdate } = useReactFlowContext();
  const { elementSelected, errorList } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const { type = "", days = "" } = data?.payload || {};
  const { errors } = errorList?.find((item: any) => item.id === nodeId) || {};
  return (
    <div className="delay-options-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        <FormControl fullWidth>
          <TextField
            label="Days"
            multiline
            error={errors?.days}
            helperText={errors?.days}
            value={days}
            name="days"
            onChange={(event: any) => {
              const onlyNums = event.target.value.replace(/[^0-9]/g, "");
              if (onlyNums) {
                handleDelayUpdate(nodeId, "DAYS", onlyNums);
              }

              if (event.target.value.length === 0) {
                handleDelayUpdate(nodeId, "DAYS", "");
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth error={errors?.type}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-delay"
            id="chooseDelay"
            value={type}
            label="Type"
            name="type"
            onChange={(event: any) =>
              handleDelayUpdate(nodeId, "TYPE", event.target.value)
            }
          >
            <MenuItem value={"week"}>Weeks</MenuItem>
            <MenuItem value={"day"}>Days</MenuItem>
          </Select>
          <FormHelperText>{errors?.type}</FormHelperText>
        </FormControl>
      </Box>
    </div>
  );
};

export default DelayOptions;

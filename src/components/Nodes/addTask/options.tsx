import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import './addtask.scss'

const config = {
  marginBottom: "20px",
};
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const AddTaskoptions = () => {
  const { state, handleTaskUpdate } = useReactFlowContext();
  const { elementSelected, errorList } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const {
    title = "",
    type = "",
    priority = "",
    assignedTo = "",
    dueData = "",
    repeat = false,
    notes = "",
  } = data?.payload || {};
  const { errors } = errorList?.find((item: any) => item.id === nodeId) || {};
  return (
    <div className="add-task-options-container">
      <Box>
        {/* title */}
        <Box sx={config}>
          <FormControl fullWidth>
            <TextField
              id="enterTitle"
              placeholder="Title"
              variant="outlined"
              className="input-addtask"
              value={title}
              name="title"
              error={errors?.title}
              helperText={errors?.title}
              onChange={(event: any) =>
                handleTaskUpdate(nodeId, "TITLE", event.target.value)
              }
            />
          </FormControl>
        </Box>
        {/* title */}
        {/* Type and priority */}
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            width: "100%",
            ...config,
          }}
        >
          <Box
            sx={{
              width: "50%",

            }}
          >
            <FormControl fullWidth error={errors?.type}>
              <InputLabel id="task-title-select-label" className="placeholder">Type</InputLabel>
              <Select
                labelId="task-title-select-label"
                id="chooseType"
                className="select-addtask"
                value={type}
                label="Type"
                name="type"
                onChange={(event: any) =>
                  handleTaskUpdate(nodeId, "TYPE", event.target.value)
                }
              >
                <MenuItem value={1}>To-Do</MenuItem>
              </Select>
              <FormHelperText>{errors?.type}</FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: "50%",
            }}
          >
            <FormControl fullWidth error={errors?.priority}>
              <InputLabel id="task-priority-select-label" className="placeholder">Priority</InputLabel>
              <Select
                labelId="task-priority-select-label"
                className="select-addtask"
                id="choosePriority"
                value={priority}
                label="Priority"
                name="priority"
                onChange={(event) =>
                  handleTaskUpdate(nodeId, "PRIORITY", event.target.value)
                }
              >
                <MenuItem value={1}>None</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
              <FormHelperText>{errors?.priority}</FormHelperText>
            </FormControl>
          </Box>
        </Box>
        {/*Assigned to */}
        <Box sx={config}>
          <FormControl fullWidth error={errors?.assignedTo}>
            <InputLabel id="task-assigned-to-select-label" className="placeholder">
              Assigned to
            </InputLabel>
            <Select
              labelId="task-title-select-label"
              id="chooseAssignedTo"
              className="select-addtask"
              value={assignedTo}
              label="Assigned to"
              name="assignedTo"
              onChange={(event) =>
                handleTaskUpdate(nodeId, "ASSIGNEDTO", event.target.value)
              }
            >
              <MenuItem value={1}>Mastan Vali</MenuItem>
              <MenuItem value={1}>Ajay</MenuItem>
            </Select>
            <FormHelperText>{errors?.assignedTo}</FormHelperText>
          </FormControl>
        </Box>
        {/* Date section start */}
        <Box sx={config} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Date"
                value={dayjs(dueData || new Date())}
                onChange={(newValue: any) => {
                  handleTaskUpdate(nodeId, "DUEDATE", newValue.$d);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        {/* Date section end */}

        {/* Repeat */}
        <Box sx={config}>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={repeat}
                onChange={(event) => {
                  handleTaskUpdate(nodeId, "REPEAT", event.target.checked);
                }}
              />
            }
            label="Repeat"
          />
        </Box>
        {/* Notes */}
        <Box sx={config}>
          <FormControl fullWidth>
            <TextField
              placeholder="Notes"
              className="input-addtask"
              multiline
              value={notes}
              rows={4}
              error={errors?.notes}
              helperText={errors?.notes}
              name="notes"
              maxRows={6}
              onChange={(event: any) =>
                handleTaskUpdate(nodeId, "NOTES", event.target.value)
              }
            />
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default AddTaskoptions;

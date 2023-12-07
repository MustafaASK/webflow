import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useReactFlowContext } from "../../../context/reactFlowContext";

const Section = ({
  item,
  handleDelete,
  ruleId,
  nodeId,
}: {
  item: any;
  handleDelete: (ruleId: string, itemId: string) => void;
  ruleId: string;
  nodeId: string;
}) => {
  const { handleUpdateOfPathRules } = useReactFlowContext();
  const handleField = (event: SelectChangeEvent) => {
    handleUpdateOfPathRules(
      nodeId,
      ruleId,
      item.id,
      event.target.value,
      "FIELD"
    );
  };
  const handleCondition = (event: SelectChangeEvent) => {
    handleUpdateOfPathRules(
      nodeId,
      ruleId,
      item.id,
      event.target.value,
      "CONDITION"
    );
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateOfPathRules(
      nodeId,
      ruleId,
      item.id,
      event.target.value,
      "TEXT"
    );
  };
  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "80%",
          }}
        >
          <Box
            sx={{
              marginBottom: "20px",
            }}
          >
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label" className="path-placeholder">
                Choose field...
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="chooseField"
                value={item.field}
                sx={{
                  '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                    background: '#ffffff'
                  }
                }}
                label="Choose field..."
                onChange={handleField}
                className="select-path-rule"
              >
                {/* <MenuItem value={10}>Ten</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              marginBottom: "20px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className="path-placeholder">
                Choose condition...
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="chooseCondition"
                sx={{
                  '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                    background: '#ffffff'
                  }
                }}
                value={item.condition}
                label="Choose condition..."
                onChange={handleCondition}
                className="select-path-rule"

              >
                <MenuItem value={1}>(Text) Contains</MenuItem>
                <MenuItem value={2}>(Text) Does not contain</MenuItem>
                <MenuItem value={3}>(Text) Exactly matches</MenuItem>
                <MenuItem value={4}>(Text) Doesnot exactly matches</MenuItem>
                <MenuItem value={5}>(Text) Is in</MenuItem>
                <MenuItem value={6}>(Text) Is not in</MenuItem>
                <MenuItem value={7}>(Text) Starts with</MenuItem>
                <MenuItem value={8}>(Text) Does not start with</MenuItem>
                <MenuItem value={9}>(Text) Ends with</MenuItem>
                <MenuItem value={10}>(Text) Does not end with</MenuItem>
                <MenuItem value={11}>(Number) Greater than</MenuItem>
                <MenuItem value={12}>(Number) Less than</MenuItem>
                <MenuItem value={13}>(Data/time) After</MenuItem>
                <MenuItem value={14}>(Date/time) Before</MenuItem>
                <MenuItem value={15}>(Date/time) Equals</MenuItem>
                <MenuItem value={16}>(Boolean) Is true</MenuItem>
                <MenuItem value={17}>(Boolean) Is false</MenuItem>
                <MenuItem value={18}>Exists</MenuItem>
                <MenuItem value={19}>Does not exists</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              marginBottom: "20px",
            }}
          >
            <FormControl fullWidth>
              <TextField
                id="textData"
                placeholder="Enter text..."
                variant="outlined"
                value={item.text}
                onChange={handleTextChange}
                className="input-path-rule"
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "1px solid #95928e",
            height: "40px",
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            // ":hover": {
            //   backgroundColor: "#fffdf9",
            //   boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 10px 0px",
            // },
          }}
          onClick={() => handleDelete(ruleId, item.id)}
        >
          <CloseIcon sx={{ color: '#9DAABF', fontSize: '20px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Section;

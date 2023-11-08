import React, { useState, useRef, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import IconButton from "@mui/material/IconButton";
import { PREVENT_OPEN_RIGHTSIDEBAR } from "../../constant/helper";
import "./rename.scss";
const Rename = ({
  nodeId,
  nodeData,
  handleRenameTooltipClose,
}: {
  nodeId: string;
  nodeData: any;
  handleRenameTooltipClose: (nodeId: string, data: string) => void;
}) => {
  const { label = "" } = nodeData?.data?.payload || {};
  const [renameData, setRenameData] = useState(label);
  const textInput = useRef(null);

  useEffect(() => {
    // @ts-ignore
    textInput.current.focus();
  }, []);

  return (
    <div className="node-rename-container" data-id={PREVENT_OPEN_RIGHTSIDEBAR}>
      <div className="node-rename-container-input">
        <FormControl fullWidth>
          <TextField
            id="RenameNodeData"
            label="Enter text..."
            variant="outlined"
            value={renameData}
            onChange={(event) => setRenameData(event.target.value)}
            inputRef={textInput}
          />
        </FormControl>
      </div>
      <div
        className="node-rename-container-icon node-rename-container-close"
        onClick={() => handleRenameTooltipClose("", "")}
      >
        <Tooltip title="Delete">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div
        className="node-rename-container-icon node-rename-container-tick"
        onClick={() => {
          if (renameData?.trim()) {
            handleRenameTooltipClose(nodeId, renameData?.trim());
          }
        }}
      >
        <Tooltip title="Rename step">
          <IconButton>
            <CheckOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Rename;

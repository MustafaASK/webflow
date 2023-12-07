import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import { Button } from "@mui/material";
import './addNote.scss'
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const AddNoteOptions = () => {
  const { state, handleSendTextUpdate } = useReactFlowContext();
  const { elementSelected, errorList } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const { text = "" } = data?.payload || {};
  const { errors } = errorList?.find((item: any) => item.id === nodeId) || {};
  return (
    <div className="add-note-options-container">
      <FormControl fullWidth>
        <TextField
          placeholder="Enter Note"
          multiline
          value={text}
          className="input-add-note"
          rows={4}
          maxRows={6}
          name="addNote"
          onChange={(event: any) =>
            handleSendTextUpdate(nodeId, event.target.value)
          }
          error={!!errors?.["addNote"]}
          helperText={errors?.["addNote"]?.[0]}
        />
      </FormControl>

      {/* <Button
        className="delay-save-btn"
        sx={{ mt: '8px', ml: '70%' }}
      >
        Save
      </Button> */}
    </div>
  );
};

export default AddNoteOptions;

import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VariablePopover from "../../variables";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import './sendText.scss'
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const SendTextOptions = () => {
  const [targetPlace, setTargetPlace] = useState(0);
  const ref = useRef(null);

  const { state, handleSendTextUpdate } = useReactFlowContext();
  const { elementSelected } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const { text = "" } = data?.payload || {};
  const [textValue, setTextValue] = useState(text);
  const handleBlur = (event: any) => {
    setTargetPlace(event.target.selectionStart);
    handleSendTextUpdate(nodeId, event.target.value);
  };

  const handleVariableSelect = useCallback(
    (text: string) => {
      let stringToAdd = `<<${text}>>`;
      setTargetPlace((prev) => prev + stringToAdd.length);
      setTextValue(
        (prev: string) =>
          prev.substring(0, targetPlace) +
          stringToAdd +
          prev.substring(targetPlace, prev.length)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textValue, setTextValue, targetPlace, ref]
  );
  useLayoutEffect(() => {
    // @ts-ignore
    ref?.current?.focus();
  }, [ref]);

  useEffect(() => {
    handleSendTextUpdate(nodeId, textValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, textValue]);
  return (
    <div className="send-text-options-container">
      <FormControl fullWidth>
        <TextField
          inputRef={ref}
          onBlur={handleBlur}
          multiline
          value={textValue}
          rows={4}
          maxRows={6}
          placeholder="Enter text message"
          className="input-sendtext "
          onChange={(event: any) => {
            setTargetPlace(event.target.selectionStart);
            setTextValue(event.target.value);
          }}
        />
        <Box
          sx={{
            marginTop: "10px",
          }}
        >
          <VariablePopover handleVariableSelect={handleVariableSelect} />
        </Box>
      </FormControl>
    </div>
  );
};

export default SendTextOptions;

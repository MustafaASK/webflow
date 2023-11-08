import React, { useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { SEND_EMAIL_CONSTANT } from "../../../constant/helper";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import VariablePopover from "../../variables";
import "react-quill/dist/quill.snow.css";
import "./send-email.scss";
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
const config = {
  marginBottom: "20px",
};
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "custom"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const SendEmailOptions = () => {
  let reactQuillRef = useRef(null);
  let quillRef = useRef(null);
  const { state, handleEmailUpdate } = useReactFlowContext();
  const { elementSelected, errorList } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const {
    template = "",
    from = [],
    cc = [],
    bcc = [],
    isCCChecked = false,
    subject = "",
    body = "",
  } = data?.payload || {};
  const { errors } = errorList?.find((item: any) => item.id === nodeId) || {};
  const handleVariableSelect = useCallback(
    (text: string) => {
      let stringToAdd = `<<${text}>>`;
      // @ts-ignore
      var range = reactQuillRef?.current?.selection;
      let position = range ? range.index : 0;
      // @ts-ignore
      reactQuillRef?.current?.editor?.insertText(position, stringToAdd);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [body, quillRef]
  );

  const newQuillEventHandler = (newQuillEvent: any) =>
    setTimeout(() =>
      handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.BODY, newQuillEvent)
    );

  return (
    <div className="send-email-options-container">
      <Box sx={{ marginBottom: "10px", paddingBottom: "30px" }}>
        {/* Template */}
        <Box sx={config}>
          <FormControl fullWidth error={errors?.template}>
            <InputLabel id="demo-simple-select-label">Template</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="chooseTemplate"
              value={template}
              label="Template"
              name="template"
              onChange={(event: any) =>
                handleEmailUpdate(
                  nodeId,
                  SEND_EMAIL_CONSTANT.TEMPLATE,
                  event.target.value
                )
              }
            >
              <MenuItem value={1}>Template 1</MenuItem>
            </Select>
            <FormHelperText>{errors?.template}</FormHelperText>
          </FormControl>
        </Box>
        {/* From */}
        <Box sx={config}>
          <Autocomplete
            id="from-outlined"
            options={top100Films}
            value={from}
            getOptionLabel={(option: any) => option.title}
            filterSelectedOptions
            onChange={(event, values) => {
              handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.FROM, values);
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                error={errors?.from}
                helperText={errors?.from}
                label="From"
                placeholder="From..."
              />
            )}
          />
        </Box>
        {/* Checkbox */}
        <Box sx={config}>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={isCCChecked}
                name="isCCChecked"
                onChange={(event: any) => {
                  handleEmailUpdate(
                    nodeId,
                    SEND_EMAIL_CONSTANT.ISCCCHECKED,
                    event.target.checked
                  );
                  handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.CC, []);
                  handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.BCC, []);
                }}
              />
            }
            label="CC & BCC"
          />
        </Box>
        {/* cc */}
        {isCCChecked && (
          <Box sx={config}>
            <Autocomplete
              multiple
              id="cc-outlined"
              options={top100Films}
              value={cc}
              getOptionLabel={(option: any) => option.title}
              filterSelectedOptions
              onChange={(event, values) => {
                handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.CC, values);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={errors?.cc}
                  helperText={errors?.cc}
                  label="Cc"
                  name="cc"
                  placeholder="Cc..."
                />
              )}
            />
          </Box>
        )}
        {/* bcc */}
        {isCCChecked && (
          <Box sx={config}>
            <Autocomplete
              multiple
              id="cc-outlined"
              options={top100Films}
              value={bcc}
              getOptionLabel={(option: any) => option.title}
              filterSelectedOptions
              onChange={(event, values) => {
                handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.BCC, values);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={errors?.bcc}
                  helperText={errors?.bcc}
                  label="Bcc"
                  name="bcc"
                  placeholder="Bcc..."
                />
              )}
            />
          </Box>
        )}
        {/* subject */}
        <Box sx={config}>
          <FormControl fullWidth>
            <TextField
              id="enterSubject"
              label="Enter Subject..."
              variant="outlined"
              value={subject}
              name="subject"
              error={errors?.subject}
              helperText={errors?.subject}
              onChange={(event) =>
                handleEmailUpdate(
                  nodeId,
                  SEND_EMAIL_CONSTANT.SUBJECT,
                  event.target.value
                )
              }
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            position: "relative",
            ...config,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "48px",
            }}
          >
            <VariablePopover
              isFromQuill={true}
              handleVariableSelect={handleVariableSelect}
            />
          </Box>
          <InputLabel shrink htmlFor="bootstrap-input">
            Body
          </InputLabel>
          <ReactQuill
            style={{
              height: "200px",
            }}
            ref={reactQuillRef}
            value={body}
            id="bootstrap-input"
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={newQuillEventHandler}
          />
        </Box>
        {errors?.body && (
          <FormControl error={errors?.body}>
            <FormHelperText>{errors?.body}</FormHelperText>
          </FormControl>
        )}
      </Box>
    </div>
  );
};

export default SendEmailOptions;

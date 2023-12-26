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
import { styled } from "@mui/material/styles";
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
  { name: "Phani", address: "onboardtest@askconsulting.com" },
  { name: "Anil", address: "onboardtest@askconsulting.com" },
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


const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#146EF6',
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

const BpCheckboxContainer = styled("div")({
  ".bp-icon": {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: '#146EF6',
  },
});

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
            <InputLabel className="temp-placeholder" id="demo-simple-select-label">Template</InputLabel>
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
            getOptionLabel={(option: any) => option.name}
            filterSelectedOptions
            onChange={(event, values) => {
              handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.FROM, values);
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                isOptionEqualToValue
                error={errors?.from.length > 0}
                helperText={errors?.from}
                className="input-send-email"
                placeholder="From..."
                sx={{
                  p: 0
                }}
              />
            )}
          />
        </Box>
        {/* Checkbox */}
        <Box sx={config}>
          <FormControlLabel
            control={
              // <Checkbox
              //   color="default"
              //   checked={isCCChecked}
              //   name="isCCChecked"
              //   onChange={(event: any) => {
              //     handleEmailUpdate(
              //       nodeId,
              //       SEND_EMAIL_CONSTANT.ISCCCHECKED,
              //       event.target.checked
              //     );
              //     handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.CC, []);
              //     handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.BCC, []);
              //   }}
              // />
              <BpCheckboxContainer>
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
                  icon={
                    <BpIcon className="bp-icon" />
                  }
                  checkedIcon={
                    <BpCheckedIcon
                      className="bp-icon"
                      style={{
                        borderColor: '#146EF6'
                      }}
                    />
                  }

                />
              </BpCheckboxContainer>
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
              getOptionLabel={(option: any) => option.name}
              filterSelectedOptions
              onChange={(event, values) => {
                handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.CC, values);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={errors?.cc}
                  helperText={errors?.cc}
                  // label="Cc"
                  name="cc"
                  placeholder="Cc..."
                  className="input-send-email"
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
              getOptionLabel={(option: any) => option.name}
              filterSelectedOptions
              onChange={(event, values) => {
                handleEmailUpdate(nodeId, SEND_EMAIL_CONSTANT.BCC, values);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={errors?.bcc}
                  helperText={errors?.bcc}
                  //label="Bcc"
                  name="bcc"
                  placeholder="Bcc..."
                  className="input-send-email"
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
              placeholder="Enter Subject..."
              variant="outlined"
              value={subject}
              name="subject"
              className="input-send-email"
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

import React from "react";
import classNames from "classnames";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./variable.scss";
const VariablePopover = ({
  handleVariableSelect,
  isFromQuill,
}: {
  handleVariableSelect: (type: string) => void;
  isFromQuill?: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={classNames({
        "button-inside-quill-wrapper": isFromQuill,
      })}
    >
      <Box className='send-text-btns-container'>
        <Button variant="text" onClick={handleClick} sx={{ textTransform: 'capitalize' }}>
          <Box sx={{ marginRight: "5px", position: "relative", top: "2px", }}>
            <AddCircleOutlineIcon />
          </Box>
          Merge Fields
        </Button>

        {/* <Button
          className="send-text-save-btn"
        >
          Save
        </Button> */}
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleVariableSelect("First name");
            handleClose();
          }}
        >
          First name
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleVariableSelect("Last name");
            handleClose();
          }}
        >
          Last name
        </MenuItem>
      </Menu>
    </div>
  );
};
export default VariablePopover;

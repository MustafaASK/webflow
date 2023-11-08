import React from "react";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import { useReactFlowContext } from "../../context/reactFlowContext";
import ACTION_IMAGE from "../../assets/img/action.svg";
import ACTION_IMAGE_WHITE from "../../assets/img/action-white.svg";
import "./actions.scss";
import { NODE_TYPES } from "../../constant/nodeTypes";
import { PREVENT_OPEN_RIGHTSIDEBAR } from "../../constant/helper";
import classNames from "classnames";

const Actions = ({ nodeId, type }: { nodeId: string; type: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { deleteNode, handleRenameFieldUpdate } = useReactFlowContext();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = (event: any, type: string) => {
    event.preventDefault();
    event.stopPropagation();
    if (type === "DELETE") {
      deleteNode(nodeId);
    } else if (type === "RENAME") {
      handleRenameFieldUpdate(nodeId);
    }
    handleClose();
  };
  return (
    <div className="node-actions-container" data-id={PREVENT_OPEN_RIGHTSIDEBAR}>
      {![NODE_TYPES.TRIGGER].includes(type) && (
        <div className="node-actions-container-item">
          <button
            className={classNames({
              "node-actions-container-item-button": true,
              "node-actions-container-item-button-override": [
                NODE_TYPES.PATH_BRANCH,
                NODE_TYPES.PATH,
              ].includes(type),
              "node-actions-container-item-button-override-pathbranch":
                NODE_TYPES.PATH_BRANCH === type,
            })}
            onClick={handleClick}
          >
            <span>
              <img
                src={
                  [NODE_TYPES.PATH, NODE_TYPES.PATH_BRANCH].includes(type)
                    ? ACTION_IMAGE_WHITE
                    : ACTION_IMAGE
                }
                alt=""
              />
            </span>
          </button>
        </div>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            width: "200px",
          }}
        >
          {[
            NODE_TYPES.PATH_BRANCH,
            NODE_TYPES.PATH_RULES,
            NODE_TYPES.PATH,
          ].includes(type) && (
            <MenuItem
              onClick={(event) => {
                handleMenuItem(event, "RENAME");
              }}
            >
              <DriveFileRenameOutlineOutlinedIcon />
              <span style={{ marginLeft: "10px" }}>Rename</span>
            </MenuItem>
          )}
          {![NODE_TYPES.PATH_RULES].includes(type) && (
            <MenuItem
              onClick={(event) => {
                handleMenuItem(event, "DELETE");
              }}
            >
              <DeleteOutlineOutlinedIcon />
              <span style={{ marginLeft: "10px" }}>Delete</span>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </div>
  );
};

export default Actions;

import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import type { NodeTypeT } from "../../../types/type";
import PathBranchTooltip from "../../pathBranchTooltip";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import ModalContent from "./modalContent";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.5) 0px 20px 30px 0px",
  borderRadius: "10px",
  width: 600,
  p: 0,
};
const AddStepNode = ({ xPos, yPos, data, id }: NodeTypeT) => {
  let { state } = useReactFlowContext();
  let { hoveredAddStepNode } = state || {};
  const isHoveredNode = hoveredAddStepNode === id;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.ADD_STEP_NODE}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.ADD_STEP_NODE}>
        {!isHoveredNode && (
          <div
            className="node-empty-add-step-branch-container"
            onClick={() => setOpen(true)}
            data-nodeid={id}
          >
            <button
              type="button"
              data-nodeid={id}
              className="node-empty-add-step-branch"
            ></button>
          </div>
        )}
        {isHoveredNode && (
          <div data-nodeid={id} className="node-container-hovererd">
            <CheckCircleIcon sx={{ color: "#3d4592", pointerEvents: "none" }} />
          </div>
        )}
        <PathBranchTooltip isStep={true} />
      </DefaultNode>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="actions-items-modal"
          aria-describedby="actions-items-modal"
        >
          <Box sx={style}>
            <ModalContent handleClose={handleClose} nodeId={id} />
          </Box>
        </Modal>
      )}
    </NodeBaseLayout>
  );
};

export default memo(AddStepNode);

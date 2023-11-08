import React from "react";
import classnames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
import { getImage } from "../../../constant/helper";
import NodesJson from "../../../content/nodes.json";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import "./modal-content.scss";
import { NODE_TYPES } from "../../../constant/nodeTypes";
const { NODES } = NodesJson;

const ActionItems = ({
  node,
  handleClose,
  nodeId,
}: {
  node: any;
  nodeId: string;
  handleClose: () => void;
}) => {
  const { state, addPath, addNode } = useReactFlowContext();
  const { edgesData } = state || {};
  const isAnynodeConnectedToPrevNode = !!edgesData?.find(
    (edge: any) => edge.source === nodeId
  );
  return (
    <div
      className={classnames({
        "node-container-action-item": true,
        "node-container-action-item-disabled":
          [NODE_TYPES.PATH, NODE_TYPES.END_AUTOMATION].includes(node?.type) &&
          isAnynodeConnectedToPrevNode,
      })}
      onClick={() => {
        if (node?.type === NODE_TYPES.PATH) {
          if (!isAnynodeConnectedToPrevNode) {
            addPath(nodeId);
            handleClose();
          }
        } else if (node?.type === NODE_TYPES.END_AUTOMATION) {
          if (!isAnynodeConnectedToPrevNode) {
            addNode(nodeId, node?.type);
            handleClose();
          }
        } else {
          addNode(nodeId, node?.type);
          handleClose();
        }
      }}
    >
      <div
        className={classnames({
          "node-container-action-item-left": true,
          [node?.categoryType]: true,
        })}
      >
        <img src={getImage({ type: node?.type })} alt="" />
      </div>
      <div className="node-container-action-item-right">{node.label}</div>
    </div>
  );
};
const ModalContent = ({
  handleClose,
  nodeId,
}: {
  handleClose: () => void;
  nodeId: string;
}) => {
  return (
    <div className="actions-modal-list-container">
      <div className="actions-modal-list-container-header">
        <div className="actions-modal-list-container-header-left">Actions</div>
        <div
          className="actions-modal-list-container-header-right"
          onClick={() => handleClose()}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="actions-modal-list-container-body">
        <div className="actions-modal-list-container-body-left">
          <div className="action-items-container">
            {NODES.map((node, index) => {
              return node.categoryType ? (
                <ActionItems
                  node={node}
                  key={index}
                  nodeId={nodeId}
                  handleClose={handleClose}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;

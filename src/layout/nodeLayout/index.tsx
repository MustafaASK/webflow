import React from "react";
import { Handle, Position } from "reactflow";
import Rename from "../../components/rename";
import "./node-layout.scss";
import { NODE_TYPES } from "../../constant/nodeTypes";
import { useReactFlowContext } from "../../context/reactFlowContext";
const NodeLayout = ({
  children,
  nodeId,
  xPos,
  yPos,
  type,
}: {
  children: any;
  nodeId: string;
  xPos: number;
  yPos: number;
  type: string;
}) => {
  const { state, handleRenameFieldUpdate, handleUpdateOfPathName } =
    useReactFlowContext();

  const { nodesData, selectedRenameId } = state || {};
  const nodeData = nodesData?.find((node: any) => node.id === nodeId);
  const showRenameTooltip = selectedRenameId === nodeId;

  const handleRenameTooltipClose = (nodeId: string, data: string) => {
    if (nodeId && data) {
      handleUpdateOfPathName(nodeId, data, type);
      handleRenameFieldUpdate("");
    } else {
      handleRenameFieldUpdate("");
    }
  };

  return (
    <div className="node-container-wrapper">
      {[
        NODE_TYPES.PATH_BRANCH,
        NODE_TYPES.PATH,
        NODE_TYPES.PATH_RULES,
      ].includes(type) &&
        showRenameTooltip && (
          <Rename
            nodeId={nodeId}
            nodeData={nodeData}
            handleRenameTooltipClose={handleRenameTooltipClose}
          />
        )}
      <div className="node-container">
        <Handle type="target" position={Position.Top} />
        {children}
        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
};

export default NodeLayout;

import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
import { useReactFlowContext } from "../../../context/reactFlowContext";
// import NodesJson from "../../../content/nodes.json";
import type { NodeTypeT } from "../../../types/type";
// const { NODES } = NodesJson;
const AddTask = ({ xPos, yPos, id }: NodeTypeT) => {
  const { state } = useReactFlowContext();
  const { errorList } = state || {};
  const { errors } = errorList?.find((item: any) => item.id === id) || {};
  const isErrorPresent = !!errors;
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.ADD_TASK}
    >
      <DefaultNode
        nodeId={id}
        type={NODE_TYPES.ADD_TASK}
        isErrorPresent={isErrorPresent}
      >
        <div className="node-header">Add Task</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(AddTask);

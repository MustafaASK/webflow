import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
// import NodesJson from "../../../content/nodes.json";
import type { NodeTypeT } from "../../../types/type";
// const { NODES } = NodesJson;
const SendText = ({ xPos, yPos, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.SEND_TEXT}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.SEND_TEXT}>
        <div className="node-header">Send Text</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(SendText);

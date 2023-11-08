import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
// import NodesJson from "../../../content/nodes.json";
import type { NodeTypeT } from "../../../types/type";
// const { NODES } = NodesJson;
const EndAutomation = ({ xPos, yPos, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.END_AUTOMATION}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.END_AUTOMATION}>
        <div className="node-header">End Automation</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(EndAutomation);

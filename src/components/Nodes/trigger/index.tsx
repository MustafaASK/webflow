import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
// import NodesJson from "../../../content/nodes.json";
import type { NodeTypeT } from "../../../types/type";
// const { NODES } = NodesJson;
const Trigger = ({ xPos, yPos, data, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.TRIGGER}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.TRIGGER}>
        <div className="node-header">Trigger</div>
        <div className="node-sub-header">An event that starts your Zap</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(Trigger);

import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
// import NodesJson from "../../../content/nodes.json";
import type { NodeTypeT } from "../../../types/type";
// const { NODES } = NodesJson;
const PathRules = ({ xPos, yPos, data, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.PATH_RULES}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.PATH_RULES}>
        <div className="node-body">Path rules</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(PathRules);

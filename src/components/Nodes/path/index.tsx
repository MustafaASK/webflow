import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
import type { NodeTypeT } from "../../../types/type";
const Path = ({ xPos, yPos, data, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout nodeId={id} xPos={xPos} yPos={yPos} type={NODE_TYPES.PATH}>
      <DefaultNode nodeId={id} type={NODE_TYPES.PATH}>
        <div className="node-body"> {data?.payload?.label}</div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(Path);

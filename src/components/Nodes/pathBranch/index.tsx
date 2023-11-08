import React, { memo } from "react";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import type { NodeTypeT } from "../../../types/type";
import Actions from "../../actions";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
import "./path-branch.scss";
const PathBranch = ({ xPos, yPos, data, id }: NodeTypeT) => {
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.PATH_BRANCH}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.PATH_BRANCH}>
        <div className="path-branch-container">
          {data?.payload?.label}
          <div className="">
            <Actions nodeId={id} type={NODE_TYPES.PATH_BRANCH} />
          </div>
        </div>
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(PathBranch);

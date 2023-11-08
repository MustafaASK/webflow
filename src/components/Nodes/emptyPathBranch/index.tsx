import React, { memo } from "react";
import { useStoreApi, useReactFlow } from "reactflow";
import NodeBaseLayout from "../../../layout/nodeLayout";
import { NODE_TYPES } from "../../../constant/nodeTypes";
import PathBranch from "../../pathBranchTooltip";
import DefaultNode from "../../../layout/nodeLayout/defaultNode";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import PLUS_ICON from "../../../assets/img/plus.svg";
import type { NodeTypeT } from "../../../types/type";
const EmptyPathBranch = ({ xPos, yPos, data, id }: NodeTypeT) => {
  const { addOnePath } = useReactFlowContext();
  const store = useStoreApi();
  const { setCenter } = useReactFlow();
  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);
    let node = nodes?.find((node) => node.id === id) || {
      position: {
        x: 0,
        y: 0,
      },
    };
    if (!!node) {
      // @ts-ignore: Since width is not a node property, we are adding it explicitely
      const width = node.width || 0;
      const x = node.position.x + width;
      const y = node.position.y;
      const zoom = 0.5;
      setCenter(x, y, { zoom, duration: 1000 });
    }
  };
  return (
    <NodeBaseLayout
      nodeId={id}
      xPos={xPos}
      yPos={yPos}
      type={NODE_TYPES.EMPTY_PATH_BRANCH}
    >
      <DefaultNode nodeId={id} type={NODE_TYPES.EMPTY_PATH_BRANCH}>
        <button
          type="button"
          className="node-empty-path-branch"
          onClick={() => {
            addOnePath(id);
            focusNode();
          }}
        >
          <img src={PLUS_ICON} alt="plus" />
        </button>
        <PathBranch />
      </DefaultNode>
    </NodeBaseLayout>
  );
};

export default memo(EmptyPathBranch);

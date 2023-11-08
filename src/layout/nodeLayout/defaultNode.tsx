import React, { useState, useLayoutEffect } from "react";
// import { useReactFlow, useStore } from "reactflow";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import classNames from "classnames";
import { NODE_TYPES } from "../../constant/nodeTypes";
import Actions from "../../components/actions";
import { getImage } from "../../constant/helper";
import NodesJson from "../../content/nodes.json";
import { useReactFlowContext } from "../../context/reactFlowContext";
import handleGhostModule from "./helper";
import "./node-layout.scss";
// const transformSelector = (state: any) => state.transform;
const { NODES } = NodesJson;
const specialNode = [
  NODE_TYPES.PATH_BRANCH,
  NODE_TYPES.EMPTY_PATH_BRANCH,
  NODE_TYPES.ADD_STEP_NODE,
];
const DefaultNode = ({
  children,
  nodeId,
  type,
  isErrorPresent,
}: {
  children: any;
  nodeId: string;
  type: string;
  isErrorPresent?: boolean;
}) => {
  // const transform = useStore(transformSelector);
  const [isMouseOver, setMouseOver] = useState(false);
  // const { setCenter, setViewport, getViewport } = useReactFlow();
  let { categoryType = "" } = NODES?.find((item) => item.type === type) || {};
  let { state } = useReactFlowContext();
  let { elementSelected } = state || {};
  let { id: elementSelectedId } = elementSelected || {};
  const onDragStart = (event: any, nodeId: string) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeId));
    event.dataTransfer.setData(`nodetype/${nodeId}`, nodeId);
    event.dataTransfer.effectAllowed = "move";
  };

  // const handleTransform = useCallback(
  //   (x: number, y: number) => {
  //     console.log("x", x);
  //     setViewport({ x: x, y: y, zoom: 0.5 });
  //   },
  //   [setViewport]
  // );

  // const onDrag = (event: any) => {
  //   const mousePos = { x: event.clientX, y: event.clientY };
  //   const zoom = 0.5;
  //   const element = document.getElementsByClassName("react-flow__container");
  //   console.log("getViewport", getViewport());
  //   // element.scrollIntoView({ behavior: "smooth", block: "center" });
  //   // handleTransform(mousePos.x, mousePos.y);
  //   // setCenter(mousePos.x, mousePos.y - 200, { zoom, duration: 0 });
  // };

  useLayoutEffect(() => {
    const dragNode = document?.getElementById(`DRAG_${nodeId}`);
    // @ts-ignore
    dragNode.addEventListener("dragstart", handleGhostModule, false);
  }, [nodeId]);

  return (
    <div
      id={`DRAG_${nodeId}`}
      onDragStart={(event) => onDragStart(event, nodeId)}
      // onDrag={(event) => onDrag(event)}
      draggable={
        [
          NODE_TYPES.ADD_STEP_NODE,
          NODE_TYPES.PATH,
          NODE_TYPES.PATH_BRANCH,
          NODE_TYPES.PATH_RULES,
          NODE_TYPES.END_AUTOMATION,
          NODE_TYPES.TRIGGER,
        ].includes(type)
          ? false
          : true
      }
      className={classNames({
        "custom-drag-handle": false,
        "node-container-default": true,
        "node-container-default-selected": elementSelectedId === nodeId,
        "node-container-path": type === NODE_TYPES.PATH,
        "node-container-default-path-branch": specialNode.includes(type),
      })}
      data-nodeid={nodeId}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setMouseOver(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMouseOver(false);
      }}
    >
      {/* {isHoveredNode && (
        <div data-nodeid={nodeId} className="node-container-hovererd"></div>
      )} */}

      {![
        NODE_TYPES.PATH_BRANCH,
        NODE_TYPES.EMPTY_PATH_BRANCH,
        NODE_TYPES.ADD_STEP_NODE,
        NODE_TYPES.PATH,
        NODE_TYPES.PATH_RULES,
        NODE_TYPES.TRIGGER,
        NODE_TYPES.END_AUTOMATION,
      ].includes(type) &&
        isMouseOver && (
          <div className="node-container-hover-icon">
            <DragIndicatorIcon color="disabled" sx={{ fontSize: 30 }} />
          </div>
        )}
      {!specialNode.includes(type) && (
        <div
          className={classNames({
            "node-container-left": true,
            [categoryType]: true,
          })}
        >
          <img src={getImage({ type })} alt={type} />
          {isErrorPresent && (
            <div className="node-container-left-error">
              <ErrorOutlinedIcon sx={{ color: "#ab003c" }} />
            </div>
          )}
        </div>
      )}
      <div
        className={classNames({
          "node-container-middle": true,
          "node-container-middle-centralize": specialNode.includes(type),
        })}
        data-nodeid={nodeId}
      >
        {children}
      </div>
      {!specialNode.includes(type) && (
        <div className="node-container-right">
          <Actions nodeId={nodeId} type={type} />
        </div>
      )}
    </div>
  );
};

export default DefaultNode;
